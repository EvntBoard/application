import * as path from 'path';
import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';

import {IPlugin, IPluginManagerApi, IPluginManagerInstance} from '../types';
import { pluginGet } from './PluginService';
import logger from './LoggerService';

let manager: PluginManager;

let plugins: Map<IPlugin, IPluginManagerInstance>;
let errors: Map<IPlugin, Error>;

export const pluginManagerGet = (plugin: IPlugin): IPluginManagerInstance => {
  return plugins.get(plugin);
};

export const init = async (): Promise<void> => {
  logger.debug('Plugin Manager Service INIT');

  // init values
  plugins = new Map<IPlugin, IPluginManagerInstance>();
  errors = new Map<IPlugin, Error>();

  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'plugins'),
  });

  // uninstall default module :)
  await manager.uninstallAll();

  // init des differents plugins
  const allPlugins = pluginGet();

  await Promise.all(
    allPlugins.map(async (plugin) => {
      try {
        await loadPlugin(plugin);
      } catch (e) {
        errors.set(plugin, e)
        logger.error(e);
      }
    })
  );
};

export const loadPlugin = async (plugin: IPlugin): Promise<void> => {
  logger.debug(`Plugin Service LOAD ${plugin}`);
  const installed = await manager.installFromGithub(plugin);
  const required: IPluginManagerInstance = manager.require(installed.name);

  // only load evntboard module :D
  if (
    !required.hasOwnProperty('evntboard') ||
    !required.hasOwnProperty('name') ||
    !required.hasOwnProperty('description') ||
    !required.hasOwnProperty('module')
  ) {
    throw new Error(`"${installed.name}" don't implement the module interface ...`);
  }
  plugins.set(plugin, required);
};

export const unloadPlugin = async (module: IPlugin): Promise<void> => {
  logger.debug('Plugin Service UNLOAD');
  await plugins.delete(module);
  await manager.uninstall(module);
};

export const reloadPlugin = async (module: IPlugin): Promise<void> => {
  await unloadPlugin(module);
  await loadPlugin(module);
};

export const infoPlugin = async (plugin: IPlugin): Promise<IPluginManagerApi> => {
  const error: Error = errors.get(plugin)
  const pluginInstance: IPluginManagerInstance = plugins.get(plugin)

  return {
    name: pluginInstance.name,
    description: pluginInstance.description,
    evntboard: pluginInstance.evntboard,
    schema: pluginInstance.schema,
    error,
  }
}

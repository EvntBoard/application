import * as path from 'path';
import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';

import { IPlugin, IPluginManagerInstance } from '../types';
import { pluginGet } from './PluginService';
import logger from './LoggerService';

let manager: PluginManager;

let plugins: Map<IPlugin, IPluginManagerInstance> = new Map();

export const pluginManagerGet = (plugin: IPlugin): IPluginManagerInstance => {
  return plugins.get(plugin);
};

export const init = async () => {
  logger.debug('Plugin Manager Service INIT');
  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'plugins'),
  });

  // uninstall default module :)
  await manager.uninstallAll();

  // init des diffferents plugins
  const allPlugins = pluginGet();

  await Promise.all(
    allPlugins.map(async (plugin) => {
      try {
        await loadPlugin(plugin);
      } catch (e) {
        logger.error(e);
      }
    })
  );
};

export const loadPlugin = async (plugin: IPlugin) => {
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

export const unloadPlugin = async (module: IPlugin) => {
  logger.debug('Plugin Service UNLOAD');
  await plugins.delete(module);
  await manager.uninstall(module);
};

export const reloadPlugin = async (module: IPlugin) => {
  await unloadPlugin(module);
  await loadPlugin(module);
};

import * as path from 'path';
import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';

import { database } from '../database/local';
import { IPlugin, IPluginEnhanced, IPluginExport } from '../types';
import logger from './LoggerService';

let manager: PluginManager;

let plugins: Map<IPlugin, IPluginExport> = new Map();

export const init = async () => {
  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'plugins'),
  });

  // uninstall default module :)
  await manager.uninstallAll();

  // init des diffferents plugins
  const allPlugins = pluginGet();

  await Promise.all(allPlugins.map(async (plugin) => await loadPlugin(plugin)));
};

export const pluginsLoaded = (): Map<string, IPluginExport> => {
  return plugins;
};

export const pluginGet = (): IPlugin[] => {
  logger.debug('Plugin Service get');
  return database.get('plugins').value();
};

export const pluginAdd = (plugin: IPlugin): IPlugin => {
  logger.debug('Plugin Service add');
  if (database.get('plugins').findIndex(plugin).value() === -1) {
    database.get('plugins').push(plugin).write();
    loadPlugin(plugin).then(() => {});
  }
  return database.get('plugins').find(plugin).value();
};

export const pluginRemove = (plugin: IPlugin): void => {
  logger.debug('Pugin Service remove');
  unloadPlugin(plugin).then(() => {});
  database.get('plugins').remove(plugin).write();
};

export const pluginGetEnhanced = async (): Promise<IPluginEnhanced[]> => {
  logger.debug('Plugin Service GET ENHANCED');
  return Array.from(plugins).map(([, value]) => ({
    evntboard: value.evntboard,
    name: value.name,
    description: value.description,
    schema: value.schema,
  }));
};

export const loadPlugin = async (plugin: IPlugin) => {
  logger.debug('Plugin Service LOAD');
  try {
    const installed = await manager.installFromGithub(plugin);
    const required: IPluginExport = manager.require(installed.name);

    // only load evntboard module :D
    if (
      !required.hasOwnProperty('evntboard') ||
      !required.hasOwnProperty('name') ||
      !required.hasOwnProperty('description') ||
      !required.hasOwnProperty('module') ||
      !required.hasOwnProperty('schema')
    ) {
      throw new Error(`"${installed.name}" don't implement the module interface ...`);
    }
    plugins.set(plugin, required);
  } catch (e) {
    logger.error(e);
  }
};

export const unloadPlugin = async (module: IPlugin) => {
  logger.debug('Plugin Service UNLOAD');
  try {
    await plugins.delete(module);
    await manager.uninstall(module);
  } catch (e) {
    logger.error(e);
  }
};

export const reloadPlugin = async (module: IPlugin) => {
  await unloadPlugin(module);
  await loadPlugin(module);
};

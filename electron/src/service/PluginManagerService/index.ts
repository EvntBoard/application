import * as path from 'path';
import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';
import { find } from 'lodash';

import { IPlugin } from '../../types';
import { IPluginInstance, IPluginManagerInfo, IPluginManagerInstance } from './types';
import { pluginFindAll } from '../PluginService';
import eventBus from '../TriggerManagerService/eventBus';
import logger from '../LoggerService';

let manager: PluginManager;

let instances: IPluginInstance[];

// manager itself

export const init = async (): Promise<void> => {
  logger.debug('Plugin Manager Service INIT');

  // init values
  instances = [];

  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'plugins'),
  });

  // uninstall default module :)
  await manager.uninstallAll();

  // init des differents plugins
  const allPlugins = pluginFindAll();

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

export const loadPlugin = async (plugin: IPlugin): Promise<void> => {
  logger.debug(`Plugin Service LOAD ${plugin.type} - ${plugin.plugin}`);

  let installed;
  switch (plugin.type) {
    case 'npm':
      installed = await manager.installFromNpm(plugin.plugin);
      break;
    case 'github':
      installed = await manager.installFromGithub(plugin.plugin);
      break;
    case 'code':
      installed = await manager.installFromPath(plugin.plugin);
      break;
    default:
      throw new Error(`Invalid type ${plugin.type}`);
  }

  const required: IPluginManagerInstance = manager.require(installed.name);

  // only load evntboard module :D
  if (
    !('evntboard' in required) ||
    !('name' in required) ||
    !('description' in required) ||
    !('module' in required)
  ) {
    throw new Error(`"${installed.name}" don't implement the plugin interface ...`);
  }

  const pluginInstance = {
    ...plugin,
    ...required,
    instance: new required.module(plugin.params, eventBus),
  };

  instances.push(pluginInstance);

  await pluginInstance.instance.load();
};

export const unloadPlugin = async (plugin: IPlugin): Promise<void> => {
  logger.debug(`Plugin Service UNLOAD ${plugin.type} - ${plugin.plugin}`);
  const pluginInstance = find(instances, { plugin: plugin.plugin });
  await pluginInstance.instance.unload();
  await manager.uninstall(plugin.plugin);
};

export const infoPlugin = async (plugin: IPlugin): Promise<IPluginManagerInfo> => {
  const pluginInstance = find(instances, { plugin: plugin.plugin });

  return {
    evntboard: pluginInstance?.evntboard,
    name: pluginInstance?.name,
    description: pluginInstance?.description,
    schema: pluginInstance?.schema,
  };
};

export const preloadPlugin = async (plugin: IPlugin): Promise<IPluginManagerInfo> => {
  logger.debug(`Plugin Service PRELOAD ${plugin.type} - ${plugin.plugin}`);

  let installed;
  try {
    switch (plugin.type) {
      case 'npm':
        installed = await manager.installFromNpm(plugin.plugin);
        break;
      case 'github':
        installed = await manager.installFromGithub(plugin.plugin);
        break;
      case 'path':
        installed = await manager.installFromPath(plugin.plugin);
        break;
      default:
        throw new Error(`Invalid type ${plugin.type}`);
    }
  } catch (e) {
    throw new Error(`${plugin.type} ${plugin.plugin} not found ... `);
  }

  const required: IPluginManagerInstance = manager.require(installed.name);

  // only load evntboard module :D
  if (
    !('evntboard' in required) ||
    !('name' in required) ||
    !('description' in required) ||
    !('module' in required)
  ) {
    throw new Error(`"${installed.name}" don't implement the plugin interface ...`);
  }

  return {
    evntboard: required?.evntboard,
    name: required?.name,
    description: required?.description,
    schema: required?.schema,
  };
};

export const reloadPlugin = async (module: IPlugin): Promise<void> => {
  await unloadPlugin(module);
  await loadPlugin(module);
};

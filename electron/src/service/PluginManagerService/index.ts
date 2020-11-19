import * as path from 'path';
import { app } from 'electron';
import { IPluginInfo, PluginManager } from 'live-plugin-manager';
import { find, filter } from 'lodash';

import { IPlugin } from '../../types';
import { IPluginManager, IPluginManagerInfo, IPluginManagerInstance } from '../../otherTypes';
import { pluginFindAll } from '../PluginService';
import { onEvent, newEvent } from '../EventBusService';
import logger from '../LoggerService';

let manager: PluginManager;

let instances: IPluginManagerInstance[];

// manager itself

export const init = async (): Promise<void> => {
  logger.debug('Plugin Manager Service INIT');

  const pluginsPath = path.join(app.getPath('userData'), 'plugins');

  // init values
  instances = [];

  manager = new PluginManager({ pluginsPath });

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
  logger.debug(`Plugin Service LOAD ${plugin.type} - ${plugin.name}`);

  let installed;
  switch (plugin.type) {
    case 'npm':
      installed = await manager.installFromNpm(plugin.name);
      break;
    case 'github':
      installed = await manager.installFromGithub(plugin.name);
      break;
    case 'path':
      installed = await manager.installFromPath(plugin.name);
      break;
    default:
      throw new Error(`Invalid type ${plugin.type}`);
  }

  const required: IPluginManager = manager.require(installed.name);

  // only load evntboard module :D
  if (
    !('id' in required) ||
    !('name' in required) ||
    !('description' in required) ||
    !('plugin' in required)
  ) {
    throw new Error(`"${installed.name}" don't implement the plugin interface ...`);
  }

  const instance = new required.plugin(plugin.params, { logger, evntBus: { onEvent, newEvent } });

  const pluginInstance = {
    ...plugin,
    plugin: required,
    instance,
  };

  instances.push(pluginInstance);

  await pluginInstance.instance.load();
};

export const unloadPlugin = async (plugin: IPlugin): Promise<void> => {
  logger.debug(`Plugin Service UNLOAD ${plugin.type} - ${plugin.name}`);
  const pluginInstance: IPluginManagerInstance = find(instances, { id: plugin.id });
  if (pluginInstance) {
    await pluginInstance.instance.unload();
    await manager.uninstall(plugin.name);
    instances = filter(instances, (i) => i.id !== plugin.id);
  }
};

export const infoPlugin = async (plugin: IPlugin): Promise<IPluginManagerInfo> => {
  const pluginInstance: IPluginManagerInstance = find(instances, { id: plugin.id });

  return {
    id: pluginInstance?.plugin?.id,
    name: pluginInstance?.plugin?.name,
    description: pluginInstance?.plugin?.description,
    schema: pluginInstance?.plugin?.schema,
  };
};

export const preloadPlugin = async (plugin: IPlugin): Promise<IPluginManagerInfo> => {
  logger.debug(`Plugin Service PRELOAD ${plugin.type} - ${plugin.name}`);

  let installed: IPluginInfo;
  try {
    switch (plugin.type) {
      case 'npm':
        installed = await manager.installFromNpm(plugin.name);
        break;
      case 'github':
        installed = await manager.installFromGithub(plugin.name);
        break;
      case 'path':
        installed = await manager.installFromPath(plugin.name);
        break;
      default:
        throw new Error(`Invalid type ${plugin.type}`);
    }
  } catch (e) {
    throw new Error(`${plugin.type} ${plugin.name} not found ... `);
  }

  const pluginInstance: IPluginManager = manager.require(installed.name);

  // only load evntboard module :D
  if (
    !('id' in pluginInstance) ||
    !('name' in pluginInstance) ||
    !('description' in pluginInstance) ||
    !('plugin' in pluginInstance)
  ) {
    throw new Error(`"${installed.name}" don't implement the plugin interface ...`);
  }

  const data = {
    id: pluginInstance?.id,
    name: pluginInstance?.name,
    description: pluginInstance?.description,
    schema: pluginInstance?.schema,
  };

  await manager.uninstall(installed.name);

  return data;
};

export const reloadPlugin = async (module: IPlugin): Promise<void> => {
  await unloadPlugin(module);
  await loadPlugin(module);
};

export const execPlugin = async (plugin: string, method: string, ...params: any): Promise<any> => {
  const pluginInstance = find(instances, { plugin: { id: plugin } });

  if (!pluginInstance) {
    throw new Error(`${plugin} doesn't exist ...`);
  }

  if (method in pluginInstance.instance) {
    try {
      // @ts-ignore
      return await pluginInstance.instance[method](...params);
    } catch (e) {
      console.log(e);
    }
  } else {
    throw new Error(`${method} doesn't exist in ${plugin} `);
  }
};

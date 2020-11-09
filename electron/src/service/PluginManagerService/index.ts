import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';
import * as path from 'path';
import { isEmpty, find } from 'lodash';

import { pluginGet } from '../PluginService';
import { pluginInstanceFindAll } from '../PluginInstanceService';
import { IPluginBase, IPluginExport, ManagerPluginInstance } from './types';
import { IPlugin, IPluginEnhanced, IPluginInstance } from '../../types';
import eventBus from '../TriggerManagerService/eventBus';
import logger from '../LoggerService';

let manager: PluginManager;

let plugins: Map<string, IPluginExport> = new Map();
let instances: ManagerPluginInstance[] = [];

export const init = async () => {
  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'plugins'),
  });

  // uninstall default module :)
  await manager.uninstallAll();

  // init des diffferents plugins
  const allPlugins = pluginGet();

  await allPlugins.map(async (plugin) => {
    await loadPlugin(plugin);
  });

  // load plugins instance

  const allPluginsInstances = pluginInstanceFindAll();
  await allPluginsInstances.map(async (plugin) => {
    await loadPluginInstance(plugin);
  });
};

// Plugins

export const pluginFindAll = async (): Promise<IPluginEnhanced[]> => {
  return Array.from(plugins).map(([, value]) => ({
    evntboard: value.evntboard,
    name: value.name,
    description: value.description,
    schema: value.schema,
  }));
};

export const loadPlugin = async (plugin: IPlugin) => {
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

// Plugins instance

export const loadPluginInstance = async (pluginInstance: IPluginInstance) => {
  const plugin = plugins.get(pluginInstance.plugin);

  try {
    const validationSchema = plugin.schema.validate(pluginInstance.params);

    if (isEmpty(validationSchema.error)) {
      const moduleInstance: IPluginBase = new plugin.module(pluginInstance.params, eventBus);

      instances.push({
        id: pluginInstance.id,
        plugin: pluginInstance.plugin,
        instance: moduleInstance,
      });

      logger.info(`${pluginInstance.plugin} loaded !`);
      await moduleInstance.load();
    } else {
      // remove from running things ...
      instances = instances.filter((instance) => instance.id !== pluginInstance.id);
      throw new Error(
        `${pluginInstance.id} - ${pluginInstance.plugin} config is not valid ...\n${validationSchema.error}`
      );
    }
  } catch (e) {
    logger.error(e);
  }
};

export const unloadPluginInstance = async (pluginInstance: IPluginInstance) => {
  try {
    const instance: ManagerPluginInstance = find(instances, { id: pluginInstance.id });

    if (instance) {
      logger.info(`${pluginInstance.plugin} loaded !`);
      await instance.instance.unload();
    }
  } catch (e) {
    logger.error(e);
  }
};

export const reloadPluginInstance = async (pluginInstance: IPluginInstance) => {
  await unloadPluginInstance(pluginInstance);
  await loadPluginInstance(pluginInstance);
};

// export const execPlugin = async (moduleName: string, method: string, ...params: any) => {
//   const toProcess: IPluginBase[] = []
//   modules.forEach((value, key) => {
//     if (key.includes(moduleName)) {
//       toProcess.push(value)
//     }
//   })
//
//   if (size(toProcess) >= 1) {
//     return Promise.all(toProcess.map(async (moduleIn) => {
//       try {
//         // @ts-ignore
//         return await moduleIn[method](...params)
//       } catch (e) {
//         throw new Error(e)
//       }
//     }))
//   } else {
//     throw new Error(`Plugin with name "${moduleName}" not found !`)
//   }
// }

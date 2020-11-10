import { v4 as uuid } from 'uuid';
import { find, isEmpty } from 'lodash';

import { database } from '../database/local';
import { IPluginInstance, IPluginBase, ManagerPluginInstance } from '../types';
import logger from './LoggerService';
import eventBus from './TriggerManagerService/eventBus';
import { pluginsLoaded } from './PluginService';

export let instances: ManagerPluginInstance[] = [];

export const init = async () => {
  // load plugins instance
  const allPluginsInstances = pluginInstanceFindAll();
  await allPluginsInstances.map(async (plugin) => {
    await loadPluginInstance(plugin);
  });
};

export const pluginInstanceCreate = (module: IPluginInstance): IPluginInstance => {
  logger.debug('Plugin instance Service CREATE');
  const id = uuid();
  database
    .get('pluginsInstance')
    .push({ ...module })
    .write();
  const created = database.get('pluginsInstance').find({ id }).value();
  loadPluginInstance(created).then(() => {});
  return created;
};

export const pluginInstanceFindAll = (): IPluginInstance[] => {
  logger.debug('Plugin instance Service FIND ALL');
  return database.get('pluginsInstance').value();
};

export const pluginInstanceFindOne = (id: string): IPluginInstance => {
  logger.debug('Plugin instance Service FIND ONE');
  return database.get('pluginsInstance').find({ id }).value();
};

export const pluginInstanceUpdate = (module: Partial<IPluginInstance>): IPluginInstance => {
  logger.debug('Plugin instance Service UPDATE');
  database
    .get('pluginsInstance')
    .find({ id: module.id })
    .assign({ ...module })
    .write();

  const updated = database.get('pluginsInstance').find({ id: module.id }).value();
  reloadPluginInstance(updated).then(() => {});
  return updated;
};

export const pluginInstanceDelete = (module: IPluginInstance): void => {
  logger.debug('Plugin instance Service DELETE');
  unloadPluginInstance(module).then(() => {});
  database.get('pluginsInstance').remove({ id: module.id }).write();
};

export const loadPluginInstance = async (pluginInstance: IPluginInstance) => {
  const plugin = pluginsLoaded().get(pluginInstance.plugin);

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

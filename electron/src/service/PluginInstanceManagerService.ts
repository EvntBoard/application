import { find, get, size, has, filter } from 'lodash';
import * as JsonSchema from 'json-schema';

import { IPlugin, IPluginInstance, IPluginManagerInstanceModule } from '../types';
import { pluginInstanceFindAll } from './PluginInstanceService';
import { pluginManagerGet } from './PluginManagerService';
import eventBus from './TriggerManagerService/eventBus';
import logger from './LoggerService';

export interface ManagerPluginInstance {
  id: string;
  plugin: IPlugin;
  instance: IPluginManagerInstanceModule;
}

let instances: ManagerPluginInstance[] = [];

export const init = async () => {
  logger.debug('Plugin instance manager service INIT');
  // load plugins instance
  const allPluginsInstances: IPluginInstance[] = pluginInstanceFindAll();
  await allPluginsInstances.map(async (plugin: IPluginInstance) => {
    await loadPluginInstance(plugin);
  });
};

export const loadPluginInstance = async (pluginInstance: IPluginInstance) => {
  const plugin = pluginManagerGet(pluginInstance.plugin);

  try {
    let valid = true;
    let jsonValidation = null;

    if (has(plugin, 'schema')) {
      jsonValidation = JsonSchema.validate(pluginInstance.params, plugin.schema);
      valid = jsonValidation.valid;
    }

    if (valid) {
      const moduleInstance: IPluginManagerInstanceModule = new plugin.module(
        pluginInstance.params,
        eventBus
      );

      logger.info(`${pluginInstance.plugin} - ${pluginInstance.id} : instance loading ...`);
      await moduleInstance.load();

      instances.push({
        id: pluginInstance.id,
        plugin: pluginInstance.plugin,
        instance: moduleInstance,
      });
    } else {
      // remove from running things ...
      instances = instances.filter((instance) => instance.id !== pluginInstance.id);
      throw new Error(
        `${pluginInstance.id} - ${pluginInstance.plugin} config is not valid ...\n${JSON.stringify(
          jsonValidation?.errors
        )}`
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
      instances = filter(instances, (instance) => instance.id !== pluginInstance.id);
    }
  } catch (e) {
    logger.error(e);
  }
};

export const reloadPluginInstance = async (pluginInstance: IPluginInstance) => {
  await unloadPluginInstance(pluginInstance);
  await loadPluginInstance(pluginInstance);
};

export const execPlugin = async (moduleName: string, method: string, ...params: any) => {
  const toProcess: ManagerPluginInstance[] = filter(instances, { plugin: moduleName });

  if (size(toProcess) >= 1) {
    const result = Promise.all(
      toProcess.map(async (moduleIn) => {
        try {
          // @ts-ignore
          return await moduleIn.instance[method](...params);
        } catch (e) {
          throw new Error(e);
        }
      })
    );
    if (size(toProcess) > 1) {
      return result;
    } else {
      return get(result, 0, null);
    }
  } else {
    throw new Error(`Plugin with name "${moduleName}" not found !`);
  }
};

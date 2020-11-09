import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';
import * as path from 'path';
import { isEmpty, size } from 'lodash';

import eventBus from '../TriggerManagerService/eventBus';
import { moduleFindAll } from '../ModuleService';
import { IModuleBase, IModuleExport } from './types';
import { IModule } from '../../types';
import logger from '../LoggerService';

let manager: PluginManager;

let modules: Map<string, IModuleBase> = new Map();

export const init = async () => {
  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'modules'),
  });

  const allModules = moduleFindAll();

  // uninstall default module :)
  await manager.uninstallAll();

  await allModules.map(async (moduleParams) => {
    await loadModule(moduleParams);
  });
};

export const loadModule = async (module: IModule) => {
  const installed = await manager.installFromGithub(module.name);

  try {
    const required: IModuleExport = manager.require(installed.name);

    // only load evntboard module :D
    if (!required.hasOwnProperty('evntboard')) return;

    if (
      !required.hasOwnProperty('name') ||
      !required.hasOwnProperty('description') ||
      !required.hasOwnProperty('module') ||
      !required.hasOwnProperty('schema')
    ) {
      throw new Error(`"${installed.name}" don't implement the module interface ...`);
    }

    const validationSchema = required.schema.validate(module.params);

    if (isEmpty(validationSchema.error)) {
      const moduleInstance: IModuleBase = new required.module(module.params, eventBus);
      modules.set(`${module.name}:${module.id}`, moduleInstance);
      logger.info(`${module.name} loaded !`);
      await moduleInstance.load();
    } else {
      // remove from running things ...
      modules.delete(`${module.name}:${module.id}`);
      throw new Error(`${module.name} config is not valid ...\n${validationSchema.error}`);
    }
  } catch (e) {
    logger.error(e);
  }
};

export const unloadModule = async (module: IModule) => {
  try {
    const moduleInstance = modules.get(`${module.name}:${module.id}`);
    await moduleInstance.unload();
  } catch (e) {
    logger.error(e);
  }
};

export const reloadModule = async (module: IModule) => {
  try {
    const moduleInstance = modules.get(`${module.name}:${module.id}`);
    await moduleInstance.reload();
  } catch (e) {
    logger.error(e);
  }
};

export const execModule = async (moduleName: string, method: string, ...params: any) => {
  const toProcess: IModuleBase[] = []
  modules.forEach((value, key) => {
    if (key.includes(moduleName)) {
      toProcess.push(value)
    }
  })

  if (size(toProcess) >= 1) {
    return Promise.all(toProcess.map(async (moduleIn) => {
      try {
        // @ts-ignore
        return await moduleIn[method](...params)
      } catch (e) {
        throw new Error(e)
      }
    }))
  } else {
    throw new Error(`Module with name "${moduleName}" not found !`)
  }
}

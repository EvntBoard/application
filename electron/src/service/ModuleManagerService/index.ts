import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';
import * as path from 'path';
import { isEmpty } from 'lodash';
import * as Joi from 'joi';

import eventBus from '../TriggerManagerService/eventBus';
import { moduleFindAll } from '../ModuleService';
import { IModuleBase, IModuleExport } from './types';
import logger from '../LoggerService'

let manager: PluginManager;

export const init = async () => {
  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'modules'),
  });

  const allModules = moduleFindAll();

  // uninstall default module :)
  await manager.uninstallAll();

  await allModules.map(async (moduleParams) => {
    const installed = await manager.installFromGithub(moduleParams.name);

    try {
      const required : IModuleExport = manager.require(installed.name);

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

      const validationSchema = required.schema.validate(moduleParams.params)

      if (isEmpty(validationSchema.error)) {
        const test: IModuleBase = new required.module(moduleParams.params, eventBus);
        logger.info(`${moduleParams.name} loaded !`)
        await test.load();
      } else {
        throw new Error(`${moduleParams.name} config is not valid ...\n${validationSchema.error}`)
      }
    } catch (e) {
      logger.error(e);
    }

  });
};

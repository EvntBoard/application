import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';
import * as path from 'path';

import { IModuleBase } from './types';
import * as eventBus from '../TriggerManagerService/eventBus';
import { moduleFindAll } from '../ModuleService';

let manager: PluginManager;

export const init = async () => {
  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'modules'),
  });

  const installedModules = moduleFindAll();

  // uninstall default module :)
  await manager.uninstallAll();

  await installedModules.map(async (module) => {
    await manager.installFromGithub('EvntBoard/module-obs');
  });

  const allModules = await manager.list();

  allModules.forEach(({ name }: any) => {
    try {
      const customModule = manager.require(name);

      // don't load evntboard module :D
      if (!customModule.hasOwnProperty('evntboard')) return;

      if (
        !customModule.hasOwnProperty('name') ||
        !customModule.hasOwnProperty('description') ||
        !customModule.hasOwnProperty('module') ||
        !customModule.hasOwnProperty('schema')
      ) {
        throw new Error(`${name} n'est pas un module evntboard chargeable`);
      }

      // get config

      const test: IModuleBase = new customModule.module(
        { host: '127.0.0.1', port: 4444, password: '' },
        eventBus
      );
      test.load();
    } catch (e) {
      console.error(e);
    }
  });
};

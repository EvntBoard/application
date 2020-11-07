import { app } from 'electron';
import { PluginManager } from 'live-plugin-manager';
import * as path from 'path';

let manager: PluginManager

export const init = async () => {
  manager = new PluginManager({
    pluginsPath: path.join(app.getPath('userData'), 'modules'),
  });

  await manager.installFromPath('/mnt/data/workspace/private/evntboard/modules/evntboard-module-twitch')

  const allModules = await manager.list()

  console.log(allModules)

  allModules.forEach(({ name }) => {
    const moment = manager.require(name);
    console.log(moment);
  })
};

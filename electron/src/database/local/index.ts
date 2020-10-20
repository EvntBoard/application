import { app } from 'electron';
import * as path from 'path';
import * as Umzug from 'umzug';
import * as Lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

import { workspaceSwitchTo, workspaceGetCurrent } from '../../service/WorkspaceService';
import { createMigration } from '../utils';
import { LocalDatabaseSchema } from '../types';

import mig1 from './migrations/01-migration';

export let database: Lowdb.LowdbSync<LocalDatabaseSchema>;

export const init = async () => {
  const currentWorkspace = workspaceGetCurrent();
  if (!currentWorkspace) {
    workspaceSwitchTo(path.join(app.getPath('home'), 'new-evntboard'));
  }

  let adapter: Lowdb.AdapterSync<LocalDatabaseSchema> = new FileAsync<LocalDatabaseSchema>(
    path.join(currentWorkspace.path, 'evntboard.json')
  );
  database = await Lowdb(adapter);

  let umzug = new Umzug({
    storage: 'json',
    storageOptions: {
      path: path.join(currentWorkspace.path, 'meta.json'),
    },
    migrations: [createMigration<LocalDatabaseSchema>(database, mig1)],
  });

  await umzug.up();

  console.debug('Local database loaded !');
};

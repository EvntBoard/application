import * as path from 'path';
import * as Umzug from 'umzug';
import * as Lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

import { createMigration } from '../utils';
import { LocalDatabaseSchema } from './types';
import { database as globalDB } from '../global';

import mig1 from './migrations/01-migration';

export let database: Lowdb.LowdbAsync<LocalDatabaseSchema>;

export const init = async () => {
  const currentWorkspace = globalDB.get('workspaces').find({ current: true }).value();
  if (!currentWorkspace) throw new Error('No workspace ..')

  let adapter: Lowdb.AdapterAsync<LocalDatabaseSchema> = new FileAsync<LocalDatabaseSchema>(
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

  console.debug('Global database loaded !');
};

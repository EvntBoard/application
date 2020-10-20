import { app } from 'electron';
import * as path from 'path';
import * as Umzug from 'umzug';
import * as Lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

import { createMigration } from '../utils';
import { GlobalDatabaseSchema } from './types';

import mig1 from './migrations/01-migration';

export let database: Lowdb.LowdbAsync<GlobalDatabaseSchema>;

export const init = async () => {
  let adapter: Lowdb.AdapterAsync<GlobalDatabaseSchema> = new FileAsync<GlobalDatabaseSchema>(
    path.join(app.getPath('userData'), 'settings.json')
  );
  database = await Lowdb(adapter);

  let umzug = new Umzug({
    storage: 'json',
    storageOptions: {
      path: path.join(app.getPath('userData'), 'meta.json'),
    },
    migrations: [createMigration<GlobalDatabaseSchema>(database, mig1)],
  });

  await umzug.up();

  console.debug('Global database loaded !');
};

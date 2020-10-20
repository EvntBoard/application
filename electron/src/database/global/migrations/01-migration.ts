import { app } from 'electron';
import * as path from 'path';
import * as Lowdb from 'lowdb';
import { GlobalDatabaseSchema } from '../../types';

export default {
  key: '1',
  up: async (db: Lowdb.LowdbAsync<GlobalDatabaseSchema>) => {
    await db.set('workspaces', []).write();

    await db
      .get('workspaces')
      .push({
        path: path.join(app.getPath('home'), 'new-evntboard'),
        current: true,
      })
      .write();
  },
};

import * as Lowdb from 'lowdb';
import { IMenu, ITheme, LocalDatabaseSchema } from '../../types';

export default {
  key: '1',
  up: async (db: Lowdb.LowdbAsync<LocalDatabaseSchema>) => {
    await db.set('triggers', []).write();
    await db.set('boards', []).write();
    await db.set('buttons', []).write();
    await db.set('menu', IMenu.OPEN).write();
    await db.set('theme', ITheme.DARK).write();
  },
};

import * as Lowdb from 'lowdb';
import { ILang, ITheme, LocalDatabaseSchema } from '../../../types';

export default {
  key: '1',
  up: async (db: Lowdb.LowdbSync<LocalDatabaseSchema>) => {
    await db.set('triggers', []).write();
    await db.set('boards', []).write();
    await db.set('buttons', []).write();
    await db.set('menu', true).write();
    await db.set('theme', ITheme.DARK).write();
    await db.set('lang', ILang.EN).write();
  },
};

import * as Lowdb from 'lowdb';
import { v4 as uuid } from 'uuid';

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
    await db
      .set('app', {
        host: '0.0.0.0',
        port: 5123,
        password: '',
      })
      .write();

    // add a new default board !
    await db
      .get('boards')
      .push({
        id: uuid(),
        color: null,
        name: 'First board',
        default: true,
        image: null,
        description: 'My default board',
        height: 5,
        width: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .write();
  },
};

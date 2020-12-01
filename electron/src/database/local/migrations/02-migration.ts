import * as Lowdb from 'lowdb';

import { LocalDatabaseSchema } from '../../../types';

export default {
  key: '2',
  up: async (db: Lowdb.LowdbSync<LocalDatabaseSchema>) => {
    await db.set('debug', {
      keepEventTime: 60 * 5
    }).write();
  },
};

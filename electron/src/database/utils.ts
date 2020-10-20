import { Migration as IMigration } from 'umzug';
import * as Lowdb from 'lowdb';

export function createMigration<T>(db: Lowdb.LowdbSync<T>, { key, up }: any): IMigration {
  return {
    file: key, // unique migration ID
    migration: null,
    up: async () => up(db), // migrate up
    down: async () => {}, // revert down
    testFileName: (needle: string) => key.startsWith(needle), // name filter used by Umzug to decide if it should run this migration
  };
}

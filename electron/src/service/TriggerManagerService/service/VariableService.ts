import { get as getLodash, set as setLodash } from 'lodash';

const variable: any = {};

// pour le client
export const set = (key: string, data: any) => {
  setLodash(variable, key, data);
  return getLodash(variable, key);
};

// pour le client
export const get = (key: string) => {
  return getLodash(variable, key);
};

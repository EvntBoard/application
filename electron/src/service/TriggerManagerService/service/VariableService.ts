import { get as getLodash } from 'lodash';

const variable: any = {};

// pour le client
export const set = (key: string, data: any) => {
  variable[key] = data;
  return get(key);
};

// pour le client
export const get = (key: string) => {
  return getLodash(variable, key);
};

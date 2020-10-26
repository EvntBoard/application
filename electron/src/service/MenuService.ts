import { database } from '../database/local';
import logger from './LoggerService';

export const menuSet = (menu: boolean): boolean => {
  logger.debug('Menu Service SET');
  database.set('menu', menu).write();
  return database.get('menu').value();
};

export const menuGet = (): boolean => {
  logger.debug('Menu Service GET');
  return database.get('menu').value();
};

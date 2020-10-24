import { database } from '../database/local';
import { IMenu } from '../types';
import logger from './LoggerService';

export const menuSet = (menu: IMenu): IMenu => {
  logger.debug('Menu Service SET');
  database.set('menu', menu).write();
  return database.get('menu').value();
};

export const menuGet = (): IMenu => {
  logger.debug('Menu Service GET');
  return database.get('menu').value();
};

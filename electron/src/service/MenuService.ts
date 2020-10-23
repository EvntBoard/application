import { database } from '../database/local';
import { IMenu } from '../database/types';
import logger from './LoggerService';

export const menuSet = (menu: IMenu): IMenu => {
  logger.debug('Menu Service SET');
  database.set('menu', menu).write();
  return menuGet();
};

export const menuGet = (): IMenu => {
  logger.debug('Menu Service GET');
  return database.get('menu').value();
};

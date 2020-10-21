import { database } from '../database/local';
import { ITheme } from '../database/types';
import logger from './LoggerService';

export const themeSet = (theme: ITheme): ITheme => {
  logger.debug('Theme Service SET');
  database.set('theme', theme).write();
  return themeGet();
};

export const themeGet = (): ITheme => {
  logger.debug('Theme Service GET');
  return database.get('theme').write();
};

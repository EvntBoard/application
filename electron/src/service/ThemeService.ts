import { database } from '../database/local';
import { ITheme } from '../types';
import logger from './LoggerService';

export const themeSet = (theme: ITheme): ITheme => {
  logger.debug('Theme Service SET');
  database.set('theme', theme).write();
  return <ITheme>database.get('theme').value();
};

export const themeGet = (): ITheme => {
  logger.debug('Theme Service GET');
  return <ITheme>database.get('theme').value();
};

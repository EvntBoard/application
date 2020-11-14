import { database } from '../database/local';
import { ITheme } from '../types';
import logger from './LoggerService';
import { broadcast } from './WebServerService';

export const themeSet = (theme: ITheme): ITheme => {
  logger.debug('Theme Service SET');
  database.set('theme', theme).write();
  const newTheme = <ITheme>database.get('theme').value();
  broadcast('themeSet', newTheme);
  return newTheme;
};

export const themeGet = (): ITheme => {
  logger.debug('Theme Service GET');
  return <ITheme>database.get('theme').value();
};

import { reload as reloadWebServer } from '../service/WebServerService';
import { database } from '../database/local';
import { IApp } from '../types';
import logger from './LoggerService';

export const appSet = (app: IApp): IApp => {
  logger.debug('App Service SET');
  database.set('app', app).write();
  // reload API server
  reloadWebServer();
  return <IApp>database.get('app').value();
};

export const appGet = (): IApp => {
  logger.debug('App Service GET');
  return <IApp>database.get('app').value();
};

import { database } from '../database/local';
import { IAppDebug } from '../types';
import logger from './LoggerService';

export const appDebugSet = (app: IAppDebug): IAppDebug => {
  logger.debug('App debug Service SET');
  database.set('debug', app).write();
  return <IAppDebug>database.get('debug').value();
};

export const appDebugGet = (): IAppDebug => {
  logger.debug('App debug Service GET');
  return <IAppDebug>database.get('debug').value();
};

import { database } from '../database/local';
import { ILang } from '../types';
import logger from './LoggerService';
import {broadcast} from "./WebServerService";

export const langSet = (lang: ILang): ILang => {
  logger.debug('Lang Service SET');
  database.set('lang', lang).write();
  const newLang = <ILang>database.get('lang').value();
  broadcast('langSet', newLang)
  return newLang
};

export const langGet = (): ILang => {
  logger.debug('Lang Service GET');
  return <ILang>database.get('lang').value(); // TODO Pourquoi on doit cast ca ?!
};

import { database } from '../database/local';
import { ILang } from '../database/types';
import logger from './LoggerService';

export const langSet = (lang: ILang): ILang => {
  logger.debug('Lang Service SET');
  database.set('lang', lang).write();
  return langGet();
};

export const langGet = (): ILang => {
  logger.debug('Lang Service GET');
  return <ILang>database.get('lang').value(); // TODO Pourquoi on doit cast ca ?!
};

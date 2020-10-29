import { database } from '../database/local';
import { IButton } from '../types';
import generateStringId from '../utils/generateStringId';
import logger from './LoggerService';

export const buttonCreate = (button: IButton): IButton => {
  logger.debug('Button Service CREATE');
  const id = generateStringId();
  database
    .get('buttons')
    .push({ ...button, id })
    .write();
  return database.get('buttons').find({ id }).value();
};

export const buttonFindAll = (): IButton[] => {
  logger.debug('Button Service FIND ALL');
  return database.get('buttons').value();
};

export const buttonFindAllByBoardId = (idBoard: string): IButton[] => {
  logger.debug('Button Service FIND ALL BY BOARD ID');
  return database.get('buttons').filter({ idBoard }).value();
};

export const buttonFindOne = (id: string): IButton => {
  logger.debug('Button Service FIND ONE');
  return database.get('buttons').find({ id }).value();
};

export const buttonUpdate = (button: Partial<IButton>): IButton => {
  logger.debug('Button Service UPDATE');
  database
    .get('buttons')
    .find({ id: button.id })
    .assign({ ...button })
    .write();
  return database.get('buttons').find({ id: button.id }).value();
};

export const buttonDelete = (button: Partial<IButton>): void => {
  logger.debug('Button Service DELETE');
  database.get('buttons').remove({ id: button.id }).write();
};

import { v4 as uuid } from 'uuid';

import { database } from '../database/local';
import { IBoard } from '../database/types';

import * as logger from './LoggerService';

export const boardCreate = (board: IBoard): IBoard => {
  logger.debug('[SERVICE.BOARD] => CREATE');
  const id = uuid();
  database
    .get('boards')
    .push({ id, ...board })
    .write();
  return boardFindOne(id);
};

export const boardFindAll = (): IBoard[] => {
  logger.debug('[SERVICE.BOARD] => FIND');
  return database.get('boards').value();
};

export const boardFindOne = (id: string): IBoard => {
  logger.debug('[SERVICE.BOARD] => FIND ONE');
  return database.get('boards').find({ id }).value();
};

export const boardUpdate = (board: Partial<IBoard>): IBoard => {
  logger.debug('[SERVICE.BOARD] => UPDATE');
  database
    .get('boards')
    .find({ id: board.id })
    .assign({ ...board })
    .write();
  return boardFindOne(board.id);
};

export const boardDelete = (board: Partial<IBoard>): void => {
  logger.debug('[SERVICE.BOARD] => DELETE');
  database.get('boards').remove({ id: board.id }).write();
};

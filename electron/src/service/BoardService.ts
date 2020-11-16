import { v4 as uuid } from 'uuid';

import { database } from '../database/local';
import { IBoard } from '../types';
import { buttonDeleteForBoard } from './ButtonService';
import { moveFileToWorkspace } from '../utils/moveFileToWorkspace';
import logger from './LoggerService';
import { broadcast } from './WebServerService';

export const boardCreate = (board: IBoard): IBoard => {
  logger.debug('Board Service CREATE');
  const id = uuid();
  database
    .get('boards')
    .push({
      ...board,
      id,
      image: moveFileToWorkspace(board.image, 'image'),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .write();
  const created = boardFindOne(id);
  broadcast('boardCreate', created);
  return created;
};

export const boardFindAll = (): IBoard[] => {
  logger.debug('Board Service FIND ALL');
  return database.get('boards').value();
};

export const boardFindOne = (id: string): IBoard => {
  logger.debug('Board Service FIND ONE');
  return database.get('boards').find({ id }).value();
};

export const boardUpdate = (board: Partial<IBoard>): IBoard => {
  logger.debug('Board Service UPDATE');
  database
    .get('boards')
    .find({ id: board.id })
    .assign({
      ...board,
      image: moveFileToWorkspace(board.image, 'image'),
      updatedAt: new Date(),
    })
    .write();
  const updated = boardFindOne(board.id);
  broadcast('boardUpdate', updated);
  return updated;
};

export const boardDelete = (board: Partial<IBoard>): void => {
  logger.debug('Board Service DELETE');
  buttonDeleteForBoard(board);
  database.get('boards').remove({ id: board.id }).write();
  broadcast('boardDelete', board);
};

export const boardSetDefault = (board: Partial<IBoard>): IBoard => {
  logger.debug('Board Service SET_DEFAULT');
  // reset current
  database.get('boards').find({ default: true }).assign({ default: false }).write();

  // set current to new :)
  database.get('boards').find({ id: board.id }).assign({ default: true }).write();

  return database.get('boards').find({ default: true }).value();
};

export const boardGetDefault = (): IBoard => {
  logger.debug('Board Service GET_DEFAULT');
  return database.get('boards').find({ default: true }).value();
};

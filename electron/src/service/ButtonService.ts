import { database } from '../database/local';
import { IBoard, IButton } from '../types';
import generateStringId from '../utils/generateStringId';
import { moveFileToWorkspace } from '../utils/moveFileToWorkspace';
import logger from './LoggerService';

export const buttonCreate = (button: IButton): IButton => {
  logger.debug('Button Service CREATE');
  const id = generateStringId();
  database
    .get('buttons')
    .push({
      ...button,
      id,
      image: moveFileToWorkspace(button.image, 'image'),
    })
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
    .assign({
      ...button,
      image: moveFileToWorkspace(button.image, 'image'),
    })
    .write();
  return database.get('buttons').find({ id: button.id }).value();
};

export const buttonDelete = (button: Partial<IButton>): void => {
  logger.debug('Button Service DELETE');
  database.get('buttons').remove({ id: button.id }).write();
};

export const buttonDeleteForBoard = (board: Partial<IBoard>): void => {
  logger.debug('Button Service DELETE for board');
  database.get('buttons').remove({ idBoard: board.id }).write();
};

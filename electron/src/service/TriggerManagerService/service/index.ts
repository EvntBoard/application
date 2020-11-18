import * as media from './MediaService';
import * as os from './OsService';
import * as file from './FileService';
import * as variable from './VariableService';
import * as utils from './UtilsService';
import {
  changeBoardImage,
  changeBoardColor,
  changeButtonColor,
  changeButtonImage,
  changeButtonText,
} from '../../CacheService';
import { execPlugin } from '../../PluginManagerService';
import { newEvent, endEvent, errorEvent, startEvent } from '../../EventBusService';
import { setSession } from '../../SessionService';
import { buttonFindOne } from '../../ButtonService';
import { IBoard, IButton } from '../../../types';
import { boardFindOne } from '../../BoardService';

const services = {
  media,
  os,
  file,
  variable,
  utils,
  board: {
    getImage: (id: string) => {
      if (id) {
        const board: IBoard = boardFindOne(id);
        return board.image;
      }
      return null;
    },
    getColor: (id: string) => {
      if (id) {
        const board: IBoard = boardFindOne(id);
        return board.color;
      }
      return null;
    },
    updateImage: changeBoardImage,
    updateColor: changeBoardColor,
    switch: (boardId: string, sender: string) => setSession(boardId, sender),
  },
  button: {
    getImage: (id: string) => {
      if (id) {
        const button: IButton = buttonFindOne(id);
        return button.image;
      }
      return null;
    },
    getColor: (id: string) => {
      if (id) {
        const button: IButton = buttonFindOne(id);
        return button.color;
      }
      return null;
    },
    getText: (id: string) => {
      if (id) {
        const button: IButton = buttonFindOne(id);
        return button.text;
      }
      return null;
    },
    updateColor: changeButtonColor,
    updateImage: changeButtonImage,
    updateText: changeButtonText,
  },
  event: { newEvent, endEvent, errorEvent, startEvent },
  plugin: execPlugin,
};

export default services;

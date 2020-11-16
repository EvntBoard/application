import * as media from './MediaService';
import * as os from './OsService';
import * as file from './FileService';
import * as variable from './VariableService';
import {
  changeBoardImage,
  changeBoardColor,
  changeButtonColor,
  changeButtonImage,
  changeButtonText,
} from '../../CacheService';
import { execPlugin } from '../../PluginManagerService';
import { newEvent, endEvent, errorEvent, startEvent } from '../eventBus';
import { setSession } from '../../SessionService';

const services = {
  media,
  os,
  file,
  variable,
  board: {
    updateImage: changeBoardImage,
    updateColor: changeBoardColor,
    switch: (boardId: string, sender: string) => setSession(boardId, sender),
  },
  button: {
    updateColor: changeButtonColor,
    updateImage: changeButtonImage,
    updateText: changeButtonText,
  },
  event: { newEvent, endEvent, errorEvent, startEvent },
  plugin: execPlugin,
};

export default services;

import * as media from './MediaService';
import * as os from './OsService';
import * as file from './FileService';
import * as variable from './VariableService';
import { execPlugin } from '../../PluginManagerService';
import { newEvent, endEvent, errorEvent, startEvent } from '../eventBus';

const services = {
  media,
  os,
  file,
  variable,
  plugin: execPlugin,
  event: { newEvent, endEvent, errorEvent, startEvent },
};

export default services;

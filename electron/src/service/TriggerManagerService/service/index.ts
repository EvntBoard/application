import * as media from './MediaService';
import { execPlugin } from '../../PluginManagerService';

const services = {
  media,
  plugin: execPlugin,
};

export default services;

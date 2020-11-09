import * as media from './MediaService';
import { execModule } from '../../ModuleManagerService';

const services = {
  media,
  module: execModule
};

export default services;

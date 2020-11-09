import { EventBus } from '../TriggerManagerService/eventBus';
import * as Joi from 'joi';

export interface IPluginBase {
  bus: EventBus;
  connected: boolean;
  new (params: any, bus: EventBus): IPluginBase;
  load: () => Promise<void>;
  unload: () => Promise<void>;
  reload: () => Promise<void>;
}

export interface IPluginExport {
  evntboard: string;
  name: string;
  description: string;
  module: IPluginBase;
  schema: Joi.Schema | null | undefined;
}

export interface ManagerPluginInstance {
  id: string;
  plugin: string;
  instance: IPluginBase;
}

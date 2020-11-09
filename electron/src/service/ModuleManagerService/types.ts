import { EventBus } from '../TriggerManagerService/eventBus';
import * as Joi from 'joi';

export interface IModuleBase {
  bus: EventBus;
  connected: boolean;
  new (params: any, bus: EventBus): IModuleBase;
  load: () => Promise<void>;
  unload: () => Promise<void>;
  reload: () => Promise<void>;
}

export interface IModuleExport {
  evntboard: string;
  name: string;
  description: string;
  module: IModuleBase;
  schema: Joi.Schema | null | undefined;
}

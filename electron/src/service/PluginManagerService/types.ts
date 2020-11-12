import { EventBus } from '../TriggerManagerService/eventBus';
import { IPlugin } from '../../types';

export interface IPluginManagerInstanceModule {
  bus: EventBus;
  connected: boolean;
  new (params: any, bus: EventBus): IPluginManagerInstanceModule;
  load: () => Promise<void>;
  unload: () => Promise<void>;
  reload: () => Promise<void>;
}

export interface IPluginManagerInstance {
  evntboard: string;
  name: string;
  description: string;
  schema: object | null | undefined;
  module: IPluginManagerInstanceModule;
}

export interface IPluginInstance extends IPlugin, IPluginManagerInstance {
  instance: IPluginManagerInstanceModule;
}

export interface IPluginManagerInfo {
  evntboard: string;
  name: string;
  description: string;
  schema: object | null | undefined;
}

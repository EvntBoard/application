import { IPlugin } from '../../types';

export interface IPluginManagerModule {
  new (params: any, options: any): IPluginManagerModule;
  load: () => Promise<void>;
  unload: () => Promise<void>;
  reload: () => Promise<void>;
}

export interface IPluginManager {
  id: string;
  name: string;
  description: string;
  schema: object | null | undefined | string;
  plugin: IPluginManagerModule;
  config: any;
}

export interface IPluginManagerInstance extends IPlugin {
  plugin: IPluginManager;
  instance: IPluginManagerModule;
}

export interface IPluginManagerInfo {
  id: string;
  name: string;
  description: string;
  schema: object | null | undefined | string;
}

// trigger

import * as Emittery from 'emittery';
import { IBoard, IButton, IPlugin } from './types';

export type ITriggerCondition = (id: any, data: any) => boolean;
export type ITriggerReaction = (data: any, services: any) => Promise<void>;

export interface ITriggerRunner {
  id: string;
  conditions: Record<string, ITriggerCondition>;
  reaction: ITriggerReaction;
  unlisten: Emittery.UnsubscribeFn;
  unload: () => void;
}

export interface ITriggerFile {
  conditions: Record<string, ITriggerCondition>;
  reaction: ITriggerReaction;
}

// Event

export interface IEvent {
  id: string;
  event: string;
  emittedAt: Date;
  emitter: string;
  payload: any | null | undefined;
}

export interface IProcessEventKey {
  idTrigger: string;
  idEvent: string;
}

export interface IProcessEventData {
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  errorDate: Date | null | undefined;
  error: Error | null | undefined;
}

export interface IProcessEvent {
  key: IProcessEventKey,
  value: IProcessEventData
}

// Cache

export interface ICache {
  boards: Partial<IBoard>[];
  buttons: Partial<IButton>[];
}

// Plugins

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

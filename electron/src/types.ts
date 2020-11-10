import * as Joi from 'joi';
import { EventBus } from './service/TriggerManagerService/eventBus';

export enum ITriggerType {
  CLASSIC = 1,
  THROTTLE = 2,
  QUEUE = 3,
  QUEUE_LOCK = 4,
}

export interface ITrigger {
  id: string;
  name: string;
  locker: string;
  type: ITriggerType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBoard {
  id: string;
  name: string;
  description: string;
  default: boolean;
  image: string;
  color: string;
  width: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IButton {
  id: string;
  idBoard: string;
  idTrigger: string;
  text: string;
  image: string;
  color: string;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum ITheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ILang {
  EN = 'en',
  FR = 'fr',
}

export interface IApp {
  host: string;
  port: number;
  password: string;
}

export type IPlugin = string;

export interface IPluginEnhanced {
  evntboard: string;
  name: string;
  description: string;
  schema: Joi.Schema | null | undefined;
}

export interface IPluginInstance {
  id: string;
  plugin: string;
  params: any;
}

export interface LocalDatabaseSchema {
  triggers: ITrigger[];
  boards: IBoard[];
  buttons: IButton[];
  plugins: IPlugin[];
  pluginsInstance: IPluginInstance[];
  menu: boolean;
  theme: ITheme;
  lang: ILang;
  app: IApp;
}

// Global BASE

export interface IWorkspace {
  path: string;
  current: boolean;
}

export interface GlobalDatabaseSchema {
  workspaces: IWorkspace[];
}

// OTHERS

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

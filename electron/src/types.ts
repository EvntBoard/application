export interface ITriggerEvent {
  event: string;
  condition: string;
}

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
  reaction: string;
  events: ITriggerEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBoard {
  id: string;
  name: string;
  description: string;
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

export interface LocalDatabaseSchema {
  triggers: ITrigger[];
  boards: IBoard[];
  buttons: IButton[];
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

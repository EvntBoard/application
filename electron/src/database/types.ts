export interface ITriggerEvent {
  event: string;
  condition: string;
}

export interface ITrigger {
  id: string;
  name: string;
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

export type IModeOPEN = true;
export type IModeCLOSE = false;

export interface LocalDatabaseSchema {
  triggers: ITrigger[];
  boards: IBoard[];
  buttons: IButton[];
  mode: IModeOPEN | IModeCLOSE;
}

export interface IWorkspace {
  path: string;
  current: boolean;
}

export interface GlobalDatabaseSchema {
  workspaces: IWorkspace[];
}

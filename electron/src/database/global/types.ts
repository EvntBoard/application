export interface IWorkspace {
  path: string;
  current: boolean;
}

export interface GlobalDatabaseSchema {
  workspaces: IWorkspace[];
}

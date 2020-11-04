import { ipcRenderer, contextBridge } from 'electron';

import {
  BUTTON,
  BOARD,
  TRIGGER,
  MENU,
  THEME,
  LANG,
  APP,
  WORKSPACE,
  WEB_SERVER, TRIGGER_MANAGER,
} from '../utils/ipc';
import { IButton, IBoard, ITrigger, ITheme, ILang, IApp } from '../types';

contextBridge.exposeInMainWorld('app', {
  button: {
    create: (data: IButton) => ipcRenderer.invoke(BUTTON.CREATE, data),
    findAll: () => ipcRenderer.invoke(BUTTON.FIND_ALL),
    findAllForBoardId: (idBoard: string) => ipcRenderer.invoke(BUTTON.FIND_ALL_BOARD_ID, idBoard),
    findOne: (id: string) => ipcRenderer.invoke(BUTTON.FIND_ONE, id),
    update: (data: IButton) => ipcRenderer.invoke(BUTTON.UPDATE, data),
    delete: (data: IButton) => ipcRenderer.invoke(BUTTON.DELETE, data),
  },
  trigger: {
    create: (data: ITrigger) => ipcRenderer.invoke(TRIGGER.CREATE, data),
    findAll: () => ipcRenderer.invoke(TRIGGER.FIND_ALL),
    findOne: (id: string) => ipcRenderer.invoke(TRIGGER.FIND_ONE, id),
    update: (data: ITrigger) => ipcRenderer.invoke(TRIGGER.UPDATE, data),
    delete: (data: ITrigger) => ipcRenderer.invoke(TRIGGER.DELETE, data),
  },
  board: {
    create: (data: IBoard) => ipcRenderer.invoke(BOARD.CREATE, data),
    findAll: () => ipcRenderer.invoke(BOARD.FIND_ALL),
    findOne: (id: string) => ipcRenderer.invoke(BOARD.FIND_ONE, id),
    update: (data: IBoard) => ipcRenderer.invoke(BOARD.UPDATE, data),
    setDefault: (data: IBoard) => ipcRenderer.invoke(BOARD.SET_DEFAULT, data),
    delete: (data: IBoard) => ipcRenderer.invoke(BOARD.DELETE, data),
  },
  theme: {
    set: (theme: ITheme) => ipcRenderer.invoke(THEME.SET, theme),
    get: () => ipcRenderer.invoke(THEME.GET),
  },
  menu: {
    set: (menu: boolean) => ipcRenderer.invoke(MENU.SET, menu),
    get: () => ipcRenderer.invoke(MENU.GET),
  },
  lang: {
    set: (lang: ILang) => ipcRenderer.invoke(LANG.SET, lang),
    get: () => ipcRenderer.invoke(LANG.GET),
  },
  appConfig: {
    set: (appConfig: IApp) => ipcRenderer.invoke(APP.SET, appConfig),
    get: () => ipcRenderer.invoke(APP.GET),
  },
  webServer: {
    openApp: () => ipcRenderer.invoke(WEB_SERVER.OPEN),
    getUrl: () => ipcRenderer.invoke(WEB_SERVER.GET_URL),
    getStatus: () => ipcRenderer.invoke(WEB_SERVER.GET_STATUS),
    onOpen: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(WEB_SERVER.ON_OPEN, callback);
    },
    onClose: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(WEB_SERVER.ON_CLOSE, callback);
    },
    onError: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(WEB_SERVER.ON_ERROR, callback);
    },
  },
  workspace: {
    getCurrent: () => ipcRenderer.invoke(WORKSPACE.GET_CURRENT),
    getAll: () => ipcRenderer.invoke(WORKSPACE.GET_ALL),
    switch: (workspace: string) => ipcRenderer.invoke(WORKSPACE.SWITCH, workspace),
    openCurrent: () => ipcRenderer.invoke(WORKSPACE.OPEN_CURENT),
    selectNew: () => ipcRenderer.invoke(WORKSPACE.SELECT_NEW),
    onChange: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(WORKSPACE.ON_CHANGE, callback);
    },
  },
  triggerManager: {
    onNew: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(TRIGGER_MANAGER.ON_NEW, callback);
    },
    onStart: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(TRIGGER_MANAGER.ON_START, callback);
    },
    onEnd: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(TRIGGER_MANAGER.ON_END, callback);
    },
    onError: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(TRIGGER_MANAGER.ON_ERROR, callback);
    },
  }
});

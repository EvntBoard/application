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
  WEB_SERVER,
  EVENT_BUS,
  EVENT_HISTORY,
  MEDIA,
  PLUGIN,
  PLUGIN_MANAGER,
  SESSION,
  CACHE,
} from './ipc';
import { IButton, IBoard, ITrigger, ITheme, ILang, IApp, IPlugin } from '../types';

contextBridge.exposeInMainWorld('app', {
  button: {
    create: (data: IButton) => ipcRenderer.invoke(BUTTON.CREATE, data),
    findAll: () => ipcRenderer.invoke(BUTTON.FIND_ALL),
    findAllForBoardId: (idBoard: string) => ipcRenderer.invoke(BUTTON.FIND_ALL_BOARD_ID, idBoard),
    findOne: (id: string) => ipcRenderer.invoke(BUTTON.FIND_ONE, id),
    update: (data: IButton) => ipcRenderer.invoke(BUTTON.UPDATE, data),
    delete: (data: IButton) => ipcRenderer.invoke(BUTTON.DELETE, data),
  },
  plugin: {
    create: (data: IButton) => ipcRenderer.invoke(PLUGIN.CREATE, data),
    findAll: () => ipcRenderer.invoke(PLUGIN.FIND_ALL),
    findOne: (id: string) => ipcRenderer.invoke(PLUGIN.FIND_ONE, id),
    update: (data: IButton) => ipcRenderer.invoke(PLUGIN.UPDATE, data),
    delete: (data: IButton) => ipcRenderer.invoke(PLUGIN.DELETE, data),
  },
  pluginManager: {
    info: (data: IPlugin) => ipcRenderer.invoke(PLUGIN_MANAGER.INFO, data),
    preload: (data: IPlugin) => ipcRenderer.invoke(PLUGIN_MANAGER.PRELOAD, data),
    reload: (data: IPlugin) => ipcRenderer.invoke(PLUGIN_MANAGER.RELOAD, data),
  },
  trigger: {
    create: (data: ITrigger) => ipcRenderer.invoke(TRIGGER.CREATE, data),
    findAll: () => ipcRenderer.invoke(TRIGGER.FIND_ALL),
    findOne: (id: string) => ipcRenderer.invoke(TRIGGER.FIND_ONE, id),
    update: (data: ITrigger) => ipcRenderer.invoke(TRIGGER.UPDATE, data),
    delete: (data: ITrigger) => ipcRenderer.invoke(TRIGGER.DELETE, data),
    editFile: (data: ITrigger) => ipcRenderer.invoke(TRIGGER.EDIT_FILE, data),
    reload: (data: ITrigger) => ipcRenderer.invoke(TRIGGER.RELOAD, data),
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
  eventBus: {
    newEvent: (event: string, data: any) => ipcRenderer.invoke(EVENT_BUS.NEW, event, data),
  },
  eventHistory: {
    get: () => ipcRenderer.invoke(EVENT_HISTORY.GET),
    getProcess: () => ipcRenderer.invoke(EVENT_HISTORY.GET_PROCESS),
    onNew: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(EVENT_HISTORY.ON_NEW, callback);
    },
    onStart: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(EVENT_HISTORY.ON_START, callback);
    },
    onEnd: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(EVENT_HISTORY.ON_END, callback);
    },
    onError: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(EVENT_HISTORY.ON_ERROR, callback);
    },
  },
  session: {
    get: () => ipcRenderer.invoke(SESSION.GET),
    onChange: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(SESSION.ON_CHANGE, callback);
    },
  },
  cache: {
    get: () => ipcRenderer.invoke(CACHE.GET),
    onChange: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(CACHE.ON_CHANGE, callback);
    },
  },
  media: {
    play: async (callback: any) => {
      ipcRenderer.on(MEDIA.PLAY, callback);
    },
  },
});

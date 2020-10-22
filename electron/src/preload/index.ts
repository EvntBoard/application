import { ipcRenderer, contextBridge } from 'electron';

import { BUTTON, BOARD, TRIGGER, MENU, THEME } from '../utils/ipc';
import { IButton, IBoard, ITrigger, ITheme, IMenu } from '../database/types';

contextBridge.exposeInMainWorld('app', {
  button: {
    create: (data: IButton) => ipcRenderer.invoke(BUTTON.CREATE, data),
    findAll: () => ipcRenderer.invoke(BUTTON.FIND_ALL),
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
    delete: (data: IBoard) => ipcRenderer.invoke(BOARD.DELETE, data),
  },
  theme: {
    set: (theme: ITheme) => ipcRenderer.invoke(THEME.SET, theme),
    get: () => ipcRenderer.invoke(THEME.GET),
  },
  menu: {
    set: (menu: IMenu) => ipcRenderer.invoke(MENU.SET, menu),
    get: () => ipcRenderer.invoke(MENU.GET),
  },
});

// ipcRenderer.on(PLAYER.PLAY, (event, { file, volume, uniqueId }) => {
//   new Howl({
//     src: [file],
//     autoplay: true,
//     volume: volume || 1,
//     onend: () => {
//       event.sender.send(`audio-${uniqueId}`);
//     },
//     onplayerror: () => {
//       event.sender.send(`audio-${uniqueId}`);
//     },
//   });
// });
//
// ipcRenderer.on(PLAYER.TTS, (event, { file, volume, uniqueId }) => {
//   new Howl({
//     src: [file],
//     autoplay: true,
//     volume: volume || 1,
//     onend: () => {
//       event.sender.send(`tts-${uniqueId}`);
//     },
//     onplayerror: () => {
//       event.sender.send(`tts-${uniqueId}`);
//     },
//   });
// });

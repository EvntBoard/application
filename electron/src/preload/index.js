import { ipcRenderer, contextBridge } from 'electron'

import { Howl } from './howler.min'

import {
  ACCOUNT,
  CONFIG,
  BUTTON,
  TRIGGER,
  BOARD,
  PLAYER,
  UTILS,
  WORKSPACE,
  TEMPLATE,
  WS,
  OBS
} from '../../../common/ipc'

contextBridge.exposeInMainWorld('app', {
  config: {
    set: (key, data) => {
      if (key === 'dark') {
        return ipcRenderer.invoke(CONFIG.SET, key, data).then((darkMode) => {
          const body = document.body
          if (darkMode) {
            body.classList.add('bp3-dark');
          } else {
            body.classList.remove('bp3-dark');
          }
          return darkMode
        })
      }
      return ipcRenderer.invoke(CONFIG.SET, key, data)
    },
    get: (key) => {
      if (key === 'dark') {
        return ipcRenderer.invoke(CONFIG.GET, 'dark').then((darkMode) => {
          const body = document.body
          if (darkMode) {
            body.classList.add('bp3-dark');
          } else {
            body.classList.remove('bp3-dark');
          }
          return darkMode
        })
      }
      return ipcRenderer.invoke(CONFIG.SET, key)
    }
  },
  account: {
    read: (data) => ipcRenderer.invoke(ACCOUNT.READ, data),
    delete: (data) => ipcRenderer.invoke(ACCOUNT.DELETE, data),
    reload: (data) => ipcRenderer.invoke(ACCOUNT.RELOAD, data),
    connect: (data) => ipcRenderer.invoke(ACCOUNT.CONNECT, data),
  },
  button: {
    create: (data) => ipcRenderer.invoke(BUTTON.CREATE, data),
    read: (data) => ipcRenderer.invoke(BUTTON.READ, data),
    readForBoard: (data) => ipcRenderer.invoke(BUTTON.READ_FOR_BOARD, data),
    update: (data) => ipcRenderer.invoke(BUTTON.UPDATE, data),
    delete: (data) => ipcRenderer.invoke(BUTTON.DELETE, data),
  },
  trigger: {
    create: (data) => ipcRenderer.invoke(TRIGGER.CREATE, data),
    read: (data) => ipcRenderer.invoke(TRIGGER.READ, data),
    update: (data) => ipcRenderer.invoke(TRIGGER.UPDATE, data),
    delete: (data) => ipcRenderer.invoke(TRIGGER.DELETE, data)
  },
  template: {
    create: (data) => ipcRenderer.invoke(TEMPLATE.CREATE, data),
    read: (data) => ipcRenderer.invoke(TEMPLATE.READ, data),
    update: (data) => ipcRenderer.invoke(TEMPLATE.UPDATE, data),
    delete: (data) => ipcRenderer.invoke(TEMPLATE.DELETE, data),
  },
  board: {
    create: (data) => ipcRenderer.invoke(BOARD.CREATE, data),
    read: (data) => ipcRenderer.invoke(BOARD.READ, data),
    update: (data) => ipcRenderer.invoke(BOARD.UPDATE, data),
    delete: (data) => ipcRenderer.invoke(BOARD.DELETE, data),
  },
  utils: {
    dir: () => ipcRenderer.invoke(UTILS.SELECT_DIR),
    locale: (locale) => ipcRenderer.invoke(UTILS.LOCALE_GET, locale)
  },
  workspace: {
    get: () => ipcRenderer.invoke(WORKSPACE.GET),
    set: (data) => ipcRenderer.invoke(WORKSPACE.SET, data)
  },
  obs: {
    get: () => ipcRenderer.invoke(OBS.GET),
    set: (data) => ipcRenderer.invoke(OBS.SET, data),
    reload: () => ipcRenderer.invoke(OBS.RELOAD)
  },
  ws: {
    get: () => ipcRenderer.invoke(WS.GET),
    set: (data) => ipcRenderer.invoke(WS.SET, data)
  }
})

ipcRenderer.on(PLAYER.PLAY, (event, { file, volume, uniqueId }) => {
  new Howl({
    src: [file],
    autoplay: true,
    volume: volume || 1,
    onend: () => {
      event.sender.send(`audio-${uniqueId}`)
    },
    onplayerror: () => {
      event.sender.send(`audio-${uniqueId}`)
    }
  })
})

ipcRenderer.on(PLAYER.TTS, (event, { file, volume, uniqueId }) => {
  new Howl({
    src: [file],
    autoplay: true,
    volume: volume || 1,
    onend: () => {
      event.sender.send(`tts-${uniqueId}`)
    },
    onplayerror: () => {
      event.sender.send(`tts-${uniqueId}`)
    }
  })
})

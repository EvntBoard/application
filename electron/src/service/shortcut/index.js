import { globalShortcut } from 'electron'
import { newEvent } from '../trigger'

export const registerShortcut = (shortcut) => {
  if (!globalShortcut.isRegistered(shortcut)) {
    globalShortcut.register(shortcut, () => {
      newEvent({ event: `shortcut:${shortcut}` })
    })
  }
}

export const unregisterShortcut = (shortcut) => {
  if (globalShortcut.isRegistered(shortcut)) {
    globalShortcut.unregister(shortcut)
  }
}

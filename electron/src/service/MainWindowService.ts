import { mainWindow } from '../window/main';

export const mainWindowsSend = (type: string, ...params: any[]): any => {
  if (mainWindow) {
    return mainWindow.webContents.send(type, ...params);
  }
};

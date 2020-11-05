import { mainWindow } from '../window/main';

export const mainWindowsSend = (type: string, data: any, other?: any): any => {
  if (mainWindow) {
    return mainWindow.webContents.send(type, data, other);
  }
};

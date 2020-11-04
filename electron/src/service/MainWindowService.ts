import { mainWindow } from '../window/main';

export const mainWindowsSend = (type: string, data: any, other?: any) => {
  if (mainWindow) {
    mainWindow.webContents.send(type, data, other);
  }
};

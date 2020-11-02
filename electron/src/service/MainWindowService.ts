import { mainWindow } from '../window/main';

export const mainWindowsSend = (type: string, data: any) => {
  if (mainWindow) {
    mainWindow.webContents.send(type, data);
  }
};

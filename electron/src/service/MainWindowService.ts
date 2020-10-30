import { mainWindow } from '../window/main';

export const mainWindowsSend = (type:string, data: any) => {
  mainWindow.webContents.send(type , data);
};

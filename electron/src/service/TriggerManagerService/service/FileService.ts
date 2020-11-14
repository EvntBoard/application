import { ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import { mainWindowsSend } from '../../MainWindowService';
import { workspaceGetCurrent } from '../../WorkspaceService';
import { MEDIA } from '../../../utils/ipc';

export const play = (file: string, volume = 1) => {
  return new Promise((resolve, reject) => {
    const workspaceDir = workspaceGetCurrent();
    const uniqueId = Math.random();

    if (file.startsWith('workspace://')) {
      let filePath = path.join(workspaceDir.path, file.replace('workspace://', ''));
      if (fs.existsSync(filePath)) {
        mainWindowsSend(MEDIA.PLAY, { file, volume, uniqueId });

        ipcMain.once(`audio-${uniqueId}`, () => {
          resolve();
        });
      } else {
        reject(`File don\'t exist : ${file} !`);
      }
    } else if (file.startsWith('http://') || file.startsWith('https://')) {
      mainWindowsSend(MEDIA.PLAY, { file, volume, uniqueId });

      ipcMain.once(`audio-${uniqueId}`, () => {
        resolve();
      });
    } else {
      reject('File can only be in workspace:// or http:// or https:// !');
    }
  });
};

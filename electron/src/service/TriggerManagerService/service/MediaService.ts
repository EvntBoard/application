import { ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import * as googleTTS from '../../../utils/google-tts';
import * as downloader from '../../../utils/google-tts/downloader';
import { mainWindowsSend } from '../../MainWindowService';
import { workspaceGetCurrent } from '../../WorkspaceService';
import { MEDIA } from '../../../preload/ipc';

export const play = (file: string, volume = 1): Promise<void> => {
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


export const tts = async (text: string, volume = 1, lang: string, speed: 1) : Promise<void> => {
  const uniqueId = Math.random();

  const workspaceDir = workspaceGetCurrent();
  const ttsFolderPath = path.join(workspaceDir.path, 'tts')

  if (!fs.existsSync(ttsFolderPath)) {
    fs.mkdirSync(ttsFolderPath);
  }

  const urls: string[] = await googleTTS(text, lang, speed)
  const files: string[] = []

  for(const url of urls) {
    const urlId = Math.random();
    let filePath = path.join(workspaceDir.path, 'tts', `${uniqueId}-${urlId}.mp3`);
    await downloader(url, filePath);
    files.push(filePath)
  }

  await new Promise((resolve) => {
    mainWindowsSend(MEDIA.TTS, {
      files: files.map(i => i.replace(workspaceDir.path, 'workspace://')),
      volume,
      uniqueId
    });
    ipcMain.once(`tts-${uniqueId}`, () => {
      resolve();
    });
  })
}

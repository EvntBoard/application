import { shell } from 'electron';
import * as express from 'express';
import * as ws from 'ws';
import * as http from 'http';
import * as path from 'path';
import * as dns from 'dns';
import * as os from 'os';
import * as electronIsDev from 'electron-is-dev';

import { appGet } from '../AppConfigService';
import { mainWindowsSend } from '../MainWindowService';
import { WEB_SERVER } from '../../utils/ipc';
import apiRoute from './api';
import logger from '../LoggerService';
import { newEvent } from "../TriggerManagerService/eventBus";

let app: express.Application;
let httpServer: http.Server;
let wsServer: ws.Server;

export const init = () => {
  try {
    logger.debug('WebServer init');
    const appConfig = appGet();

    app = express();

    if (electronIsDev) {
      app.use(express.static(path.join(process.cwd(), 'build', 'web')));
    } else {
      app.use(express.static(path.join(__dirname, 'web')));
    }

    app.use('/api', apiRoute);

    httpServer = app.listen(appConfig.port, appConfig.host);

    httpServer.on('listening', () => {
      mainWindowsSend(WEB_SERVER.ON_OPEN, {
        connected: true,
        error: null,
      });
    });

    httpServer.on('error', (e: Error) => {
      logger.error(e);
      mainWindowsSend(WEB_SERVER.ON_ERROR, {
        connected: false,
        error: e.name,
      });
    });

    httpServer.on('close', () => {
      mainWindowsSend(WEB_SERVER.ON_CLOSE, {
        connected: false,
        error: null,
      });
    });

    wsServer = new ws.Server({ server: httpServer, path: '/ws' });

    wsServer.on('connection', (socket) => {
      logger.debug('WS connection');
      socket.on('message', (message: any) => {
        if (message.event) {
          newEvent(message)
        }
      });
    });
  } catch (e) {
    logger.error(e);
    mainWindowsSend(WEB_SERVER.ON_ERROR, {
      connected: false,
      error: e.name,
    });
  }
};

export const reload = () => {
  if (httpServer) {
    httpServer.close();
  }
  init();
};

export const getStatus = (): boolean => {
  return httpServer && httpServer.listening;
};

export const openApp = async (): Promise<void> => {
  const appConfig = appGet();
  const ip = await getLocalIp();
  await shell.openExternal(`http://${ip}:${appConfig.port}`);
};

export const getUrl = async (): Promise<String> => {
  const appConfig = appGet();
  const ip = await getLocalIp();
  return `http://${ip}:${appConfig.port}`;
};

const getLocalIp = async (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    dns.lookup(os.hostname(), (err, add) => {
      if (err) {
        reject(err);
      } else {
        resolve(add);
      }
    });
  });
};

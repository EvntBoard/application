import { shell } from 'electron';
import * as express from 'express';
import { Server } from 'socket.io';
import * as http from 'http';
import * as path from 'path';
import * as dns from 'dns';
import * as os from 'os';
import * as electronIsDev from 'electron-is-dev';
import * as cors from 'cors';
import { CorsOptions } from "cors";

import { appGet } from '../AppConfigService';
import { mainWindowsSend } from '../MainWindowService';
import { newEvent } from '../EventBusService';
import { WEB_SERVER } from '../../preload/ipc';
import apiRoute from './api';
import logger from '../LoggerService';
import { newSession } from '../SessionService';

let app: express.Application;
let httpServer: http.Server;
let wsServer: Server;

const corsConfig: CorsOptions = {
  origin: '*'
}

export const init = () => {
  try {
    logger.debug('WebServer init');
    const appConfig = appGet();

    app = express();

    app.use(cors(corsConfig));
    app.options('*', cors(corsConfig));

    httpServer = http.createServer(app);

    wsServer = new Server(httpServer, {
      path: '/ws',
      cors: corsConfig
    });

    wsServer.on('connection', (socket) => {
      logger.debug('WS connection');

      // create new session
      newSession(socket.id);

      socket.on('createEvent', (message: any) => {
        if (message.event) {
          newEvent(message.event, {
            ...message,
            emitter: socket.id,
          });
        } else {
          logger.error(message);
        }
      });
    });

    if (electronIsDev) {
      app.use(express.static(path.join(process.cwd(), 'build', 'web')));
    } else {
      app.use(express.static(path.join(__dirname, 'web')));
    }

    app.use('/api', apiRoute);

    httpServer.listen(appConfig.port, appConfig.host);

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

export const broadcast = async (event: string, ...params: any[]) => {
  wsServer.emit(event, ...params);
};

export const broadcastToClient = async (id: string, event: string, ...params: any[]) => {
  try {
    wsServer.sockets.sockets.get(id).emit(event, ...params);
  } catch (e) {
    console.error(e);
  }
};

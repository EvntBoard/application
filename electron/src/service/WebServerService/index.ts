import * as express from 'express';
import * as ws from 'ws';
import * as http from 'http';
import * as path from 'path';
import * as electronIsDev from 'electron-is-dev';

import { appGet } from '../AppConfigService';
import logger from '../LoggerService';
import { router as apiRoute } from './Api';
import {mainWindowsSend} from "../MainWindowService";
import {WEB_SERVER} from "../../utils/ipc";

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

    wsServer = new ws.Server({ noServer: true });

    wsServer.on('connection', (socket) => {
      logger.debug('WS connection');
      socket.on('message', (message) => console.log(message));
    });

    httpServer = app.listen(appConfig.port, appConfig.host);

    httpServer.on('listening', () => {
      mainWindowsSend(WEB_SERVER.STATUS_CHANGE, true)
    })

    httpServer.on('error', (...args) => {
      logger.error(args)
      mainWindowsSend(WEB_SERVER.STATUS_CHANGE, false)
    });

    httpServer.on('close', () => {
      mainWindowsSend(WEB_SERVER.STATUS_CHANGE, false)
    })

    httpServer.on('upgrade', (request, socket, head) => {
      wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit('connection', socket, request);
      });
    });
  } catch (e) {
    logger.error(e);
    mainWindowsSend(WEB_SERVER.STATUS_CHANGE, false)
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

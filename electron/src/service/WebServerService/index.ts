import * as express from 'express';
import * as ws from 'ws';
import * as http from 'http';
import * as path from 'path';
import * as electronIsDev from 'electron-is-dev';

import { appGet } from '../AppConfigService';
import logger from '../LoggerService';
import { router as apiRoute } from './Api'

let app: express.Application;
let httpServer: http.Server;
let wsServer: ws.Server;

export const init = () => {
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

  httpServer.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit('connection', socket, request);
    });
  });
};

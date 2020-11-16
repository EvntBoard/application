import * as Emittery from 'emittery';
import { v4 as uuid } from 'uuid';

import { mainWindowsSend } from '../MainWindowService';
import { broadcast } from '../WebServerService';
import { TRIGGER_MANAGER } from '../../preload/ipc';
import logger from '../LoggerService';

export const bus = new Emittery();

export interface EventBus {
  bus: Emittery;
  newEvent: (data: any) => void;
  startEvent: (data: any) => void;
  endEvent: (data: any) => void;
  errorEvent: (data: any, e: Error) => void;
}

export const newEvent = (data: any) => {
  const uniqueId = uuid();
  const meta = {
    uniqueId,
    newDate: new Date(),
    ...data.meta,
  };

  switch (data.event) {
    case 'obs-stream-status':
      break;
    default:
      logger.debug(`New event [${uniqueId}] ${data.event}`);
      break;
  }

  const event = { ...data, meta };

  bus.emit(data.event, event);
  mainWindowsSend(TRIGGER_MANAGER.ON_NEW, event);
  broadcast('newEvent', event);
};

export const startEvent = (data: any) => {
  logger.debug(`start event [${data.meta.uniqueId}] ${data.event}`);
  data.meta.startDate = new Date();
  mainWindowsSend(TRIGGER_MANAGER.ON_START, data);
  broadcast('startEvent', data);
};

export const endEvent = (data: any) => {
  logger.debug(`end event [${data.meta.uniqueId}] ${data.event}`);
  data.meta.endDate = new Date();
  mainWindowsSend(TRIGGER_MANAGER.ON_END, data);
  broadcast('endEvent', data);
};

export const errorEvent = (data: any, e: Error) => {
  logger.error(`error event [${data.meta.uniqueId}] ${data.event}`);
  logger.error(`${e.name} : ${e.message}`);
  data.meta.errorDate = new Date();
  mainWindowsSend(TRIGGER_MANAGER.ON_ERROR, data, e);
  broadcast('errorEvent', data, e);
};

const defaultBus: EventBus = {
  bus,
  newEvent,
  startEvent,
  endEvent,
  errorEvent,
};

export default defaultBus;

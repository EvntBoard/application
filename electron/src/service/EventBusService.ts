import * as Emittery from 'emittery';
import { v4 as uuid } from 'uuid';

import { EVENT_BUS } from '../preload/ipc';
import { mainWindowsSend } from './MainWindowService';
import { broadcast } from './WebServerService';
import { historyPush } from './EventHistoryService';
import logger from './LoggerService';
import { EventBus, IEvent } from '../otherTypes';

export const bus = new Emittery();

export const newEvent = (event: IEvent) => {
  const newEvent = {
    ...event,
    id: uuid(),
  };

  logger.debug(`New event [${newEvent.id}] ${newEvent.event}`);

  bus.emit(newEvent.event, event);
  mainWindowsSend(EVENT_BUS.ON_NEW, event);
  broadcast('newEvent', event);
};

export const startEvent = (data: any) => {
  logger.debug(`start event [${data.meta.uniqueId}] ${data.event}`);
  data.meta.startDate = new Date();
  historyPush(data);
  mainWindowsSend(EVENT_BUS.ON_START, data);
  broadcast('startEvent', data);
};

export const endEvent = (data: any) => {
  logger.debug(`end event [${data.meta.uniqueId}] ${data.event}`);
  data.meta.endDate = new Date();
  historyPush(data);
  mainWindowsSend(EVENT_BUS.ON_END, data);
  broadcast('endEvent', data);
};

export const errorEvent = (data: any, e: Error) => {
  logger.error(`error event [${data.meta.uniqueId}] ${data.event}`);
  logger.error(`${e.name} : ${e.message}`);
  data.meta.errorDate = new Date();
  historyPush(data);
  mainWindowsSend(EVENT_BUS.ON_ERROR, data, e);
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

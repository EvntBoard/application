import * as Emittery from 'emittery';
import { v4 as uuid } from 'uuid';

import { mainWindowsSend } from '../MainWindowService';
import logger from '../LoggerService';
import {TRIGGER_MANAGER} from "../../utils/ipc";

export const bus = new Emittery();

export const newEvent = (data: any) => {
  const uniqueId = uuid();
  const meta = {
    uniqueId,
    newDate: new Date()
  }

  switch (data.event) {
    case 'obs-stream-status':
      break;
    default:
      logger.debug(`New event [${uniqueId}] ${data.event}`);
      break;
  }

  bus.emit(data.event, { ...data, meta });
  mainWindowsSend(TRIGGER_MANAGER.ON_NEW, { ...data, meta })
};

export const startEvent = (data: any) => {
  logger.debug(`start event [${data.meta.uniqueId}] ${data.event}`);
  data.meta.startDate = new Date()
  mainWindowsSend(TRIGGER_MANAGER.ON_START, data)
};

export const endEvent = (data: any) => {
  logger.debug(`end event [${data.meta.uniqueId}] ${data.event}`);
  data.meta.endDate = new Date()
  mainWindowsSend(TRIGGER_MANAGER.ON_END, data)
};

export const errorEvent = (data: any, e: Error) => {
  logger.error(`error event [${data.meta.uniqueId}] ${data.event}`);
  logger.error(`${e.name} : ${e.message}`);
  data.meta.errorDate = new Date()
  mainWindowsSend(TRIGGER_MANAGER.ON_ERROR, data, e)
};

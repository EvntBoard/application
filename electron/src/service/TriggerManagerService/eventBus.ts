import * as Emittery from 'emittery';
import { v4 as uuid } from 'uuid';

import * as logger from '../LoggerService';

export const bus = new Emittery();

export const newEvent = (data: any) => {
  const uniqueId = uuid();

  switch (data.event) {
    case 'obs-stream-status':
      break;
    default:
      logger.debug(`New event [${uniqueId}] ${data.event}`);
      break;
  }

  bus.emit(data.event, { ...data, uniqueId });
};

export const startEvent = (data: any) => {
  logger.debug(`start event [${data.uniqueId}] ${data.event}`);
};

export const endEvent = (data: any) => {
  logger.debug(`end event [${data.uniqueId}] ${data.event}`);
};

export const errorEvent = (data: any, e: Error) => {
  logger.error(`error event [${data.uniqueId}] ${data.event}`);
  logger.error(`${e.name} : ${e.message}`);
  console.log(e);
};

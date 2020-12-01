import * as Emittery from 'emittery';
import { v4 as uuid } from 'uuid';
import { omit } from 'lodash';

import { historyPush } from './EventHistoryService';
import { IEvent } from '../otherTypes';
import logger from './LoggerService';

const bus = new Emittery();

export const newEvent = (event: string, payload?: any) => {
  const newEvent: IEvent = {
    id: uuid(),
    event,
    payload: omit(payload, 'emitter'),
    emitter: payload?.emitter || null,
    emittedAt: new Date(),
  };

  if (newEvent.event !== 'obs-stream-status') {
    logger.debug(`New event [${newEvent.id}] ${newEvent.event}`);
  }

  bus.emit(newEvent.event, newEvent);
  historyPush(newEvent);
};

export const onEvent = (event: string | string[], listener: (eventData?: unknown) => void) => {
  return bus.on(event, listener);
};

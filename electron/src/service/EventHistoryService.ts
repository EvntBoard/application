import { sortBy, find, reverse, cloneDeep } from 'lodash';

import logger from './LoggerService';
import { IEvent, IProcessEvent, IProcessEventData, IProcessEventKey } from '../otherTypes';
import { EVENT_HISTORY } from '../preload/ipc';
import { mainWindowsSend } from './MainWindowService';
import { broadcast } from './WebServerService';

let history: Array<IEvent>;
let historyProcess: IProcessEvent;

const SAMPLE_PROCESS_EVENT: IProcessEventData = {
  startDate: null,
  endDate: null,
  error: null,
  errorDate: null,
}

const keyToMapKey = (key: IProcessEventKey): string => {
  return `${key.idTrigger}:${key.idEvent}`
}

export const init = () => {
  history = [];
  historyProcess = new Map<string, IProcessEventData>();
};

export const historyGet = (): Array<IEvent> => reverse(sortBy(history, [(o: IEvent) => o.emittedAt]));
export const historyProcessGet = (): IProcessEvent => historyProcess

export const historyPush = (event: IEvent): void => {
  const storedEvent = find(history, (e: IEvent) => e.id === event.id);
  if (!storedEvent) {
    mainWindowsSend(EVENT_HISTORY.ON_NEW, event);
    broadcast('newEvent', event);
    history.push(event);
  } else {
    logger.error(`Already an event with ID ${event.id}`);
  }
};

// PROCESS

export const historyProcessStart = (key: IProcessEventKey): void => {
  logger.debug(`start process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const already = historyProcess.get(keyToMapKey(key));
    const newData: IProcessEventData = {
      ...cloneDeep(SAMPLE_PROCESS_EVENT),
      ...already,
      startDate: new Date(),
    };
    historyProcess.set(keyToMapKey(key), newData);
    mainWindowsSend(EVENT_HISTORY.ON_START, { key, value: newData });
    broadcast('startProcessEvent', { key, value: newData });
  }
};

export const historyProcessEnd = (key: IProcessEventKey): void => {
  logger.debug(`end process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const already = historyProcess.get(keyToMapKey(key));
    const newData: IProcessEventData = {
      ...cloneDeep(SAMPLE_PROCESS_EVENT),
      ...already,
      endDate: new Date(),
    };
    historyProcess.set(keyToMapKey(key), newData);
    mainWindowsSend(EVENT_HISTORY.ON_END, { key, value: newData });
    broadcast('endProcessEvent', { key, value: newData });
  }
};

export const historyProcessError = (key: IProcessEventKey, error: Error): void => {
  logger.debug(`error process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const already = historyProcess.get(keyToMapKey(key));
    const newData: IProcessEventData = {
      ...cloneDeep(SAMPLE_PROCESS_EVENT),
      ...already,
      errorDate: new Date(),
      error,
    };
    historyProcess.set(keyToMapKey(key), newData);
    mainWindowsSend(EVENT_HISTORY.ON_ERROR, { key, value: newData });
    broadcast('errorProcessEvent', { key, value: newData });
  }
};

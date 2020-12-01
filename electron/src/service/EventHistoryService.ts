import { sortBy, find, reverse, cloneDeep, filter } from 'lodash';
import differenceInSeconds from 'date-fns/differenceInSeconds';

import logger from './LoggerService';
import { IEvent, IProcessEvent, IProcessEventData, IProcessEventKey } from '../otherTypes';
import { EVENT_HISTORY } from '../preload/ipc';
import { mainWindowsSend } from './MainWindowService';
import { broadcast } from './WebServerService';
import { appDebugGet } from './DebugConfigService';
import { IAppDebug } from "../types";

let history: Array<IEvent>;
let historyProcess: Map<string, IProcessEventData>;
let interval: NodeJS.Timeout = null;

const SAMPLE_PROCESS_EVENT: IProcessEventData = {
  startDate: null,
  endDate: null,
  error: null,
  errorDate: null,
};

const keyToMapKey = (key: IProcessEventKey): string => {
  return `${key.idTrigger}:${key.idEvent}`;
};

export const init = () => {
  history = [];
  historyProcess = new Map<string, IProcessEventData>();

  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval(purge, 2000)
};

const purge = () => {
  const debugConfig: IAppDebug = appDebugGet()
  const currentDate = new Date()
  const toDelete = filter(history, (i) => differenceInSeconds(currentDate, i.emittedAt) >= debugConfig.keepEventTime)

  toDelete.forEach((i) => {
    historyProcess.forEach((value, key) => {
      if (key.includes(i.id)) {
        historyProcess.delete(key)
      }
    })
  })

  history = [...filter(history, (i) => differenceInSeconds(currentDate, i.emittedAt) < debugConfig.keepEventTime)]
}

export const historyGet = (): Array<IEvent> => reverse(sortBy(history, [(o: IEvent) => o.emittedAt]));

const historyKeyGet = (key: IProcessEventKey): IProcessEvent => {
  return {
    key,
    value: historyProcess.get(keyToMapKey(key))
  }
};

const historyKeySet = (key: IProcessEventKey, value: Partial<IProcessEventData>): IProcessEvent => {
  const data = historyKeyGet(key);

  const newData = {
    ...cloneDeep(SAMPLE_PROCESS_EVENT),
    ...data.value,
    ...value
  }

  historyProcess.set(keyToMapKey(key), newData)

  return {
    key,
    value: newData
  }
};

export const historyProcessGet = (): Array<IProcessEvent> => {
  const data: Array<IProcessEvent> = []

  historyProcess.forEach((value, key) => {
    const [idTrigger, idEvent] = key.split(':')
    data.push({
      key: {
        idEvent,
        idTrigger,
      },
      value
    })
  })

  return data
};

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
    const newData = {
      startDate: new Date(),
    }

    historyKeySet(key, newData);
    mainWindowsSend(EVENT_HISTORY.ON_START, historyKeyGet(key));
    broadcast('startProcessEvent', historyKeyGet(key));
  }
};

export const historyProcessEnd = (key: IProcessEventKey): void => {
  logger.debug(`end process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const newData = {
      endDate: new Date(),
    };

    historyKeySet(key, newData);
    mainWindowsSend(EVENT_HISTORY.ON_END, historyKeyGet(key));
    broadcast('endProcessEvent', historyKeyGet(key));
  }
};

export const historyProcessError = (key: IProcessEventKey, error: Error): void => {
  logger.debug(`error process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const newData = {
      errorDate: new Date(),
      error,
    };

    historyKeySet(key, newData);
    mainWindowsSend(EVENT_HISTORY.ON_ERROR, historyKeyGet(key));
    broadcast('errorProcessEvent', historyKeyGet(key));
  }
};

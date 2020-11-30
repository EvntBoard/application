import { sortBy, find, reverse, cloneDeep, filter, isEqual } from 'lodash';

import logger from './LoggerService';
import { IEvent, IProcessEvent, IProcessEventData, IProcessEventKey } from '../otherTypes';
import { EVENT_HISTORY } from '../preload/ipc';
import { mainWindowsSend } from './MainWindowService';
import { broadcast } from './WebServerService';

let history: Array<IEvent>;
let historyProcess: Array<IProcessEvent>;

const SAMPLE_PROCESS_EVENT: IProcessEventData = {
  startDate: null,
  endDate: null,
  error: null,
  errorDate: null,
};

export const init = () => {
  history = [];
  historyProcess = [];
};

export const historyGet = (): Array<IEvent> =>
  reverse(sortBy(history, [(o: IEvent) => o.emittedAt]));

const historyKeyGet = (key: IProcessEventKey): IProcessEvent => {
  return find(historyProcess, (i) => isEqual(i.key.idTrigger, key.idTrigger) && isEqual(i.key.idEvent, key.idEvent))
}

const historyKeySet = (key: IProcessEventKey, value: IProcessEventData): IProcessEvent => {
  const data = historyKeyGet(key);
  if (data) {
    historyProcess = [
      ...filter(historyProcess, (i) => !isEqual(i.key.idTrigger, key.idTrigger) && !isEqual(i.key.idEvent, key.idEvent)),
      {
        ...data,
        ...value
      }
    ]
  } else {
    const newData = {
      key,
      value
    }
    historyProcess = [
      ...historyProcess,
      newData
    ]
    return newData
  }
}

export const historyProcessGet = (): Array<IProcessEvent> => historyProcess;

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
    const already = historyKeyGet(key);
    if (already === undefined) {
      const newData = {
        ...cloneDeep(SAMPLE_PROCESS_EVENT),
        startDate: new Date(),
      }

      historyKeySet(key, newData)
      mainWindowsSend(EVENT_HISTORY.ON_START, {
        key,
        value: newData
      });
      broadcast('startProcessEvent', {
        key,
        value: newData
      });
    } else {
      console.error('Weird how did you get there ?!');
    }
  }
};

export const historyProcessEnd = (key: IProcessEventKey): void => {
  logger.debug(`end process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const already = historyKeyGet(key);

    const newData: IProcessEventData = {
      ...cloneDeep(SAMPLE_PROCESS_EVENT),
      ...already?.value,
      endDate: new Date(),
    };

    historyKeySet(key, newData);
    mainWindowsSend(EVENT_HISTORY.ON_END, {
      key,
      value: newData
    });
    broadcast('endProcessEvent', {
      key,
      value: newData
    });
  }
};

export const historyProcessError = (key: IProcessEventKey, error: Error): void => {
  logger.debug(`error process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const already = historyKeyGet(key);

    let newData: IProcessEventData = cloneDeep(SAMPLE_PROCESS_EVENT)

    if (already && already.value) {
      newData = {
        ...newData,
        ...already?.value,
      }
    }

    newData = {
      ...newData,
      errorDate: new Date(),
      error,
    }

    historyKeySet(key, newData);
    mainWindowsSend(EVENT_HISTORY.ON_ERROR, {
      key,
      value: newData
    });
    broadcast('errorProcessEvent', {
      key,
      value: newData
    });
  }
};

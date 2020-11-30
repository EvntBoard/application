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

const keyToMapKey = (key: IProcessEventKey): string => {
  return `${key.idTrigger}:${key.idEvent}`;
};

export const init = () => {
  history = [];
  historyProcess = [];
};

export const historyGet = (): Array<IEvent> =>
  reverse(sortBy(history, [(o: IEvent) => o.emittedAt]));

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
    const alreadyIndex = find(historyProcess, { key });
    if (alreadyIndex === null) {
      const newData: IProcessEvent =  {
        key,
        value: {
          ...cloneDeep(SAMPLE_PROCESS_EVENT),
          startDate: new Date(),
        }
      }

      historyProcess.push()
      mainWindowsSend(EVENT_HISTORY.ON_START, newData);
      broadcast('startProcessEvent', newData);
    } else {
      console.error('Weird how did you get there ?!')
    }
  }
};

export const historyProcessEnd = (key: IProcessEventKey): void => {
  logger.debug(`end process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const already = find(historyProcess, { key });

    const newData: IProcessEvent =  {
      key,
      value: {
        ...cloneDeep(SAMPLE_PROCESS_EVENT),
        ...already,
        endDate: new Date(),
      }
    }

    historyProcess = [
      ...filter(historyProcess, i => !isEqual(i.key, key)),
      newData
    ];
    mainWindowsSend(EVENT_HISTORY.ON_END, newData);
    broadcast('endProcessEvent', newData);
  }
};

export const historyProcessError = (key: IProcessEventKey, error: Error): void => {
  logger.debug(`error process event [${key.idTrigger}] - "${key.idEvent}"`);
  if (key && key.idEvent && key.idTrigger) {
    const already = find(historyProcess, { key });

    const newData: IProcessEvent =  {
      key,
      value: {
        ...cloneDeep(SAMPLE_PROCESS_EVENT),
        ...already,
        errorDate: new Date(),
        error
      }
    }

    historyProcess = [
      ...filter(historyProcess, i => !isEqual(i.key, key)),
      newData
    ];
    mainWindowsSend(EVENT_HISTORY.ON_ERROR, newData);
    broadcast('errorProcessEvent', newData);
  }
};

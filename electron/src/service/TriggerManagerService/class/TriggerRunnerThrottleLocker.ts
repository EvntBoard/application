import * as Emittery from 'emittery';
import { Mutex, MutexInterface } from 'async-mutex';
import { isFunction } from 'lodash';

import { ITrigger } from '../../../types';
import { onEvent } from '../../EventBusService';
import {
  historyProcessStart,
  historyProcessEnd,
  historyProcessError,
} from '../../EventHistoryService';
import { evalCodeFromFile } from '../utils';
import logger from '../../LoggerService';
import services from '../service';
import { IEvent, ITriggerCondition, ITriggerReaction, ITriggerRunner } from '../../../otherTypes';

const locker = new Map<string, Mutex>();

export default class TriggerRunnerQueueLocker implements ITriggerRunner {
  id: string;
  reaction: ITriggerReaction;
  conditions: Record<string, ITriggerCondition>;
  unlisten: Emittery.UnsubscribeFn;
  private locker: string;

  constructor(triggerEntity: ITrigger) {
    try {
      if (triggerEntity.locker === undefined) {
        throw new Error("locker should be set cause it's a trigger with QUEUE_LOCK type !");
      }

      this.id = triggerEntity.id;
      this.locker = triggerEntity.locker;

      // load trigger file
      const triggerData = evalCodeFromFile(triggerEntity);
      this.reaction = triggerData.reaction;
      this.conditions = triggerData.conditions;

      const eventsList = Object.keys(this.conditions);

      if (!locker.has(this.locker)) {
        locker.set(this.locker, new Mutex());
      }

      this.unlisten = onEvent(eventsList, (data: IEvent) => {
        const triggerCondition: ITriggerCondition | undefined = this.conditions[data.event];
        if (triggerCondition !== undefined && triggerCondition(this.id, data)) {
          this.processEvent(data);
        }
      });
    } catch (e) {
      logger.error(e);
      logger.error('Trigger Manager failed to load', triggerEntity);
    }
  }

  getLocker(): Mutex | undefined {
    return locker.get(this.locker);
  }

  unload() {
    if (isFunction(this.unlisten)) {
      this.unlisten();
    }
  }

  processEvent(data: IEvent) {
    const locker: Mutex | undefined = this.getLocker();
    if (locker !== undefined && !locker.isLocked()) {
      locker.acquire().then((release: MutexInterface.Releaser) => {
        historyProcessStart({ idEvent: data.id, idTrigger: this.id });
        this.reaction(data, services)
          .then(() => {
            release();
            historyProcessEnd({ idEvent: data.id, idTrigger: this.id });
          })
          .catch((e: Error) => {
            release();
            historyProcessError({ idEvent: data.id, idTrigger: this.id }, e);
          });
      });
    }
  }
}

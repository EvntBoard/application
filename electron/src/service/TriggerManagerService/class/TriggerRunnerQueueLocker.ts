import * as Emittery from 'emittery';
import { Mutex, MutexInterface } from 'async-mutex';
import { isFunction } from 'lodash';

import { ITrigger } from '../../../types';
import { bus, startEvent, errorEvent, endEvent } from '../../EventBusService';
import { evalCodeFromFile } from '../utils';
import logger from '../../LoggerService';
import services from '../service';
import { ITriggerCondition, ITriggerReaction, ITriggerRunner } from '../../../otherTypes';

const locker = new Map<string, Mutex>();

export default class TriggerRunnerQueueLocker implements ITriggerRunner {
  id: string;
  reaction: ITriggerReaction;
  conditions: Record<string, ITriggerCondition>;
  unlisten: Emittery.UnsubscribeFn;
  private locker: string;
  private queue: string[];

  constructor(triggerEntity: ITrigger) {
    try {
      if (triggerEntity.locker === undefined) {
        throw new Error("locker should be set cause it's a trigger with QUEUE_LOCK type !");
      }

      this.id = triggerEntity.id;
      this.queue = [];
      this.locker = triggerEntity.locker;

      // load trigger file
      const triggerData = evalCodeFromFile(triggerEntity);
      this.reaction = triggerData.reaction;
      this.conditions = triggerData.conditions;

      const eventsList = Object.keys(this.conditions);

      if (!locker.has(this.locker)) {
        locker.set(this.locker, new Mutex());
      }

      this.unlisten = bus.on(eventsList, (data: any) => {
        const triggerCondition: ITriggerCondition | undefined = this.conditions[data.event];
        if (triggerCondition !== undefined && triggerCondition(this.id, data)) {
          this.queue.push(data);
          this.processEvent();
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

  processEvent() {
    const locker: Mutex | undefined = this.getLocker();
    if (this.queue.length > 0 && locker !== undefined) {
      locker.acquire().then((release: MutexInterface.Releaser) => {
        const data = this.queue.shift();
        startEvent(data);
        this.reaction(data, services)
          .then(() => {
            release();
            endEvent(data);
          })
          .catch((e: Error) => {
            release();
            errorEvent(data, e);
          });
      });
    }
  }
}

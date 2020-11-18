import * as Emittery from 'emittery';
import { isFunction } from 'lodash';

import { ITrigger } from '../../../types';
import { bus, startEvent, errorEvent, endEvent } from '../../EventBusService';
import { evalCodeFromFile } from '../utils';
import logger from '../../LoggerService';
import services from '../service';
import { ITriggerCondition, ITriggerReaction, ITriggerRunner } from '../../../otherTypes';

export default class TriggerRunnerQueue implements ITriggerRunner {
  id: string;
  reaction: ITriggerReaction;
  conditions: Record<string, ITriggerCondition>;
  unlisten: Emittery.UnsubscribeFn;
  private queue: string[];
  private running: boolean;

  constructor(triggerEntity: ITrigger) {
    try {
      this.id = triggerEntity.id;
      this.queue = [];
      this.running = false;

      // load trigger file
      const triggerData = evalCodeFromFile(triggerEntity);
      this.reaction = triggerData.reaction;
      this.conditions = triggerData.conditions;

      const eventsList = Object.keys(this.conditions);

      this.unlisten = bus.on(eventsList, (data: any) => {
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

  processEvent(data: any) {
    this.queue.push(data);
    if (!this.running) {
      this.process();
    }
  }

  unload() {
    if (isFunction(this.unlisten)) {
      this.unlisten();
    }
  }

  process() {
    if (this.queue.length > 0) {
      this.running = true;

      const data = this.queue.shift();
      startEvent(data);
      this.reaction(data, services)
        .then(() => {
          this.running = false;
          endEvent(data);
          this.process();
        })
        .catch((e: Error) => {
          this.running = false;
          errorEvent(data, e);
          this.process();
        });
    }
  }
}

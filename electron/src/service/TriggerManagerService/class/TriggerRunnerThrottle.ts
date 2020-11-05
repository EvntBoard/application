import * as Emittery from 'emittery';
import { isFunction } from 'lodash';

import { ITriggerCondition, ITriggerReaction, ITriggerRunner } from '../types';
import { ITrigger } from '../../../types';
import { bus, startEvent, errorEvent, endEvent } from '../eventBus';
import { evalCodeFromFile } from '../utils';
import logger from '../../LoggerService';
import services from '../service';

export default class TriggerRunnerThrottle implements ITriggerRunner {
  id: string;
  reaction: ITriggerReaction;
  conditions: Record<string, ITriggerCondition>;
  unlisten: Emittery.UnsubscribeFn;
  private running: boolean;

  constructor(triggerEntity: ITrigger) {
    try {
      this.id = triggerEntity.id;
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

  unload() {
    if (isFunction(this.unlisten)) {
      this.unlisten();
    }
  }

  processEvent(data: any) {
    if (!this.running) {
      this.running = true;
      startEvent(data);
      this.reaction(data, services)
        .then(() => {
          this.running = false;
          endEvent(data);
        })
        .catch((e: Error) => {
          this.running = false;
          errorEvent(data, e);
        });
    }
  }
}

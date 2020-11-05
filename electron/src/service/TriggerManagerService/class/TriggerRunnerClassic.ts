import * as Emittery from 'emittery';
import { isFunction } from 'lodash';

import { ITrigger } from '../../../types';
import { ITriggerCondition, ITriggerReaction, ITriggerRunner } from '../types';
import { bus, startEvent, errorEvent, endEvent } from '../eventBus';
import { evalCodeFromFile } from '../utils';
import logger from '../../LoggerService';
import services from '../exportedServices';

export default class TriggerRunnerClassic implements ITriggerRunner {
  id: string;
  reaction: ITriggerReaction;
  conditions: Record<string, ITriggerCondition>;
  unlisten: Emittery.UnsubscribeFn;

  constructor(triggerEntity: ITrigger) {
    try {
      this.id = triggerEntity.id;

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
    startEvent(data);
    this.reaction(data, services)
      .then(() => {
        endEvent(data);
      })
      .catch((e: Error) => {
        errorEvent(data, e);
      });
  }
}

import * as Emittery from 'emittery';
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

  unload() {
    if (isFunction(this.unlisten)) {
      this.unlisten();
    }
  }

  processEvent(data: IEvent) {
    if (!this.running) {
      this.running = true;
      historyProcessStart({ idEvent: data.id, idTrigger: this.id });
      this.reaction(data, services)
        .then(() => {
          this.running = false;
          historyProcessEnd({ idEvent: data.id, idTrigger: this.id });
        })
        .catch((e: Error) => {
          this.running = false;
          historyProcessError({ idEvent: data.id, idTrigger: this.id }, e);
        });
    }
  }
}

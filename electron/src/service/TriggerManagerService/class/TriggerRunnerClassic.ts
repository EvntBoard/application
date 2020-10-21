import { find } from 'lodash';
import * as Emittery from 'emittery';
import * as requireFromString from 'require-from-string';

import logger from '../../../service/LoggerService';
import { ITrigger } from '../../../database/types';
import { ITriggerRunner, ITriggerRunnerEvents } from '../types';
import { bus, startEvent, errorEvent, endEvent } from '../eventBus';

export default class TriggerRunnerClassic implements ITriggerRunner {
  id: string;
  reaction: (data: any) => Promise<void>;
  events: Array<ITriggerRunnerEvents>;
  unlisten: Emittery.UnsubscribeFn;

  constructor(triggerEntity: ITrigger) {
    try {
      this.id = triggerEntity.id;
      this.reaction = requireFromString(triggerEntity.reaction);
      this.events = triggerEntity.events.map((i) => ({
        event: i.event,
        condition: requireFromString(i.condition),
      }));
      const eventsList = this.events.map((i) => i.event);
      this.unlisten = bus.on(eventsList, (data: any) => {
        const eventRunner: ITriggerRunnerEvents | undefined = find(
          this.events,
          (i) => i.event === data.event
        );
        if (eventRunner !== undefined && eventRunner.condition(this.id, data)) {
          this.processEvent(data);
        }
      });
    } catch (e) {
      logger.error('Trigger Manager failed to load', triggerEntity);
    }
  }

  unload() {
    this.unlisten();
  }

  processEvent(data: any) {
    startEvent(data);
    this.reaction(data)
      .then(() => {
        endEvent(data);
      })
      .catch((e: Error) => {
        errorEvent(data, e);
      });
  }
}

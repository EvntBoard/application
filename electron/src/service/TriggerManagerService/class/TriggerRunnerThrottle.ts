import { find } from 'lodash';
import * as Emittery from 'emittery';
import * as requireFromString from 'require-from-string';

import { ITriggerRunner, ITriggerRunnerEvents } from '../types';
import { ITrigger } from '../../../types';
import { bus, startEvent, errorEvent, endEvent } from '../eventBus';

export default class TriggerRunnerThrottle implements ITriggerRunner {
  id: string;
  events: Array<ITriggerRunnerEvents>;
  reaction: (data: any) => Promise<void>;
  unlisten: Emittery.UnsubscribeFn;
  private running: boolean;

  constructor(triggerEntity: ITrigger) {
    this.running = false;
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
  }

  unload() {
    this.unlisten();
  }

  processEvent(data: any) {
    if (!this.running) {
      this.running = true;
      startEvent(data);
      this.reaction(data)
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

import { find } from 'lodash';
import * as Emittery from 'emittery';
import * as requireFromString from 'require-from-string';

import { ITriggerRunner, ITriggerRunnerEvents } from '../types';
import { ITrigger } from '../../../database/types';
import { bus, startEvent, errorEvent, endEvent } from '../eventBus';

export default class TriggerRunnerQueue implements ITriggerRunner {
  id: string;
  reaction: (data: any) => Promise<void>;
  events: Array<ITriggerRunnerEvents>;
  unlisten: Emittery.UnsubscribeFn;
  private queue: string[];
  private running: boolean;

  constructor(triggerEntity: ITrigger) {
    this.id = triggerEntity.id;
    this.reaction = requireFromString(triggerEntity.reaction);
    this.events = triggerEntity.events.map((i) => ({
      event: i.event,
      condition: requireFromString(i.condition),
    }));
    this.queue = [];
    this.running = false;

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

  processEvent(data: any) {
    this.queue.push(data.uniqueId);
    if (!this.running) {
      this.process();
    }
  }

  unload() {
    this.unlisten();
  }

  process() {
    if (this.queue.length > 0) {
      this.running = true;

      const data = this.queue.shift();
      startEvent(data);
      this.reaction(data)
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

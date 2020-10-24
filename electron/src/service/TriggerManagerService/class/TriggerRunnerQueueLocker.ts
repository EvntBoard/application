import { find } from 'lodash';
import * as Emittery from 'emittery';
import * as requireFromString from 'require-from-string';
import { Mutex, MutexInterface } from 'async-mutex';

import { ITriggerRunner, ITriggerRunnerEvents } from '../types';
import { ITrigger } from '../../../types';
import { bus, startEvent, errorEvent, endEvent } from '../eventBus';

const locker = new Map<string, Mutex>();

export default class TriggerRunnerQueueLocker implements ITriggerRunner {
  id: string;
  reaction: (data: any) => Promise<void>;
  events: Array<ITriggerRunnerEvents>;
  unlisten: Emittery.UnsubscribeFn;
  private locker: string;
  private queue: string[];

  constructor(triggerEntity: ITrigger) {
    if (!triggerEntity.id) throw new Error('WTF !');
    if (triggerEntity.locker === undefined)
      throw new Error("locker should be set cause it's a trigger with QUEUE_LOCK type !");

    this.queue = [];
    this.id = triggerEntity.id;
    this.locker = triggerEntity.locker;
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
        this.queue.push(data.id);
        this.processEvent();
      }
    });

    if (!locker.has(this.locker)) {
      locker.set(this.locker, new Mutex());
    }
  }

  getLocker(): Mutex | undefined {
    return locker.get(this.locker);
  }

  unload() {
    this.unlisten();
  }

  processEvent() {
    const locker: Mutex | undefined = this.getLocker();
    if (this.queue.length > 0 && locker !== undefined) {
      locker.acquire().then((release: MutexInterface.Releaser) => {
        const data = this.queue.shift();
        startEvent(data);
        this.reaction(data)
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

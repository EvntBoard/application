import * as Emittery from 'emittery';

export interface ITriggerRunnerEvents {
  event: string;
  condition: (id: any, data: any) => boolean;
}

export interface ITriggerRunner {
  id: string;
  events: Array<ITriggerRunnerEvents>;
  reaction: (data: any) => Promise<void>;
  unlisten: Emittery.UnsubscribeFn;
  unload: () => void;
}

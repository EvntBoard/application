import * as Emittery from 'emittery';

export type ITriggerCondition = (id: any, data: any) => boolean;
export type ITriggerReaction = (data: any, services: any) => Promise<void>;

export interface ITriggerRunner {
  id: string;
  conditions: Record<string, ITriggerCondition>;
  reaction: ITriggerReaction;
  unlisten: Emittery.UnsubscribeFn;
  unload: () => void;
}

export interface ITriggerFile {
  conditions: Record<string, ITriggerCondition>;
  reaction: ITriggerReaction;
}

import { EventBus } from '../TriggerManagerService/eventBus';

export enum ModuleAvailable {
  TWITCH = 'twitch',
  OBS = 'obs',
  SLOBS = 'slobs',
}

export class IModuleBase {
  type: ModuleAvailable;
  bus: EventBus;
  connected: boolean;
  load: () => Promise<void>;
  unload: () => Promise<void>;
  reload: () => Promise<void>;
}

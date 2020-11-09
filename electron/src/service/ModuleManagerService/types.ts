import { EventBus } from '../TriggerManagerService/eventBus';

export class IModuleBase {
  evntboard: string;
  bus: EventBus;
  connected: boolean;
  load: () => Promise<void>;
  unload: () => Promise<void>;
  reload: () => Promise<void>;
}

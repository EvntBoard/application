import TriggerRunnerClassic from './class/TriggerRunnerClassic';
import TriggerRunnerThrottle from './class/TriggerRunnerThrottle';
import TriggerRunnerQueue from './class/TriggerRunnerQueue';
import TriggerRunnerQueueLocker from './class/TriggerRunnerQueueLocker';

import { ITrigger, ITriggerType } from '../../database/types';
import { ITriggerRunner } from './types';

export default (triggerEntity: ITrigger): ITriggerRunner => {
  switch (triggerEntity.type) {
    case ITriggerType.QUEUE_LOCK:
      return new TriggerRunnerQueueLocker(triggerEntity);
    case ITriggerType.QUEUE:
      return new TriggerRunnerQueue(triggerEntity);
    case ITriggerType.THROTTLE:
      return new TriggerRunnerThrottle(triggerEntity);
    case ITriggerType.CLASSIC:
    default:
      return new TriggerRunnerClassic(triggerEntity);
  }
};

import TriggerRunnerClassic from './class/TriggerRunnerClassic';
import TriggerRunnerThrottle from './class/TriggerRunnerThrottle';
import TriggerRunnerQueue from './class/TriggerRunnerQueue';
import TriggerRunnerQueueLocker from './class/TriggerRunnerQueueLocker';
import TriggerRunnerThrottleLocker from './class/TriggerRunnerThrottleLocker';

import { ITrigger, ITriggerType } from '../../types';
import { ITriggerRunner } from '../../otherTypes';

export default (triggerEntity: ITrigger): ITriggerRunner => {
  switch (triggerEntity.type) {
    case ITriggerType.QUEUE_LOCK:
      return new TriggerRunnerQueueLocker(triggerEntity);
    case ITriggerType.QUEUE:
      return new TriggerRunnerQueue(triggerEntity);
    case ITriggerType.THROTTLE:
      return new TriggerRunnerThrottle(triggerEntity);
    case ITriggerType.THROTTLE_LOCK:
      return new TriggerRunnerThrottleLocker(triggerEntity);
    case ITriggerType.CLASSIC:
    default:
      return new TriggerRunnerClassic(triggerEntity);
  }
};

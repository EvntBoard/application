import { triggerType } from './constant'

import TriggerClassic from './class/TriggerClassic'
import TriggerThrottle from './class/TriggerThrottle'
import TriggerQueue from './class/TriggerQueue'
import TriggerQueueLocker from './class/TriggerQueueLocker'

export default (triggerEntity, services) => {
  switch (triggerEntity.type) {
    case triggerType.QUEUE_LOCK:
      return new TriggerQueueLocker(triggerEntity, services)
    case triggerType.QUEUE:
      return new TriggerQueue(triggerEntity, services)
    case triggerType.THROTTLE:
      return new TriggerThrottle(triggerEntity, services)
    case triggerType.CLASSIC:
    default:
      return new TriggerClassic(triggerEntity, services)
  }
}

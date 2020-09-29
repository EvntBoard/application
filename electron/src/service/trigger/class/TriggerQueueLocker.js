import { isFunction, has, isNull, isEmpty } from 'lodash'
import { Mutex } from 'async-mutex'

const locker = new Map()

export default class TriggerQueueLocker {
  constructor(triggerEntity, services) {
    this.id = triggerEntity.id
    this.locker = triggerEntity.locker
    this.reaction = triggerEntity.reaction
    this.events = triggerEntity.events
    this.condition = triggerEntity.condition
    this.services = services
    this.queue = []

    if (isNull(this.locker) || isEmpty(this.locker)) {
      throw new Error('locker should be set cause it\'s a trigger with QUEUE_LOCK type !')
    } else {
      if (!locker.has(this.locker)) {
        locker.set(this.locker, new Mutex())
      }
    }
  }

  getLocker() {
    return locker.get(this.locker)
  }

  recieveEvent(data) {
    if (this.events.includes(data.event) && (!has(this.condition, data.event) || this.condition[data.event](this.id, data))) {
      this.queue.push(data)
      this.processEvent()
    }
  }

  processEvent() {
    if (isFunction(this.reaction) && this.queue.length > 0) {
      this.getLocker().acquire().then((release) => {
        const data = this.queue.shift()
        this.services.event.start(data)
        this.reaction(data, this.services).then(() => {
          release()
          this.services.event.end(data)
        }).catch((e) => {
          release()
          this.services.event.error(data, e)
        })
      })
    }
  }
}

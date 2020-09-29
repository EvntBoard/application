import { isFunction, has } from 'lodash'

export default class TriggerQueue {

  constructor(triggerEntity, services) {
    this.id = triggerEntity.id
    this.reaction = triggerEntity.reaction
    this.events = triggerEntity.events
    this.condition = triggerEntity.condition
    this.services = services
    this.queue = []
    this.running = false
  }

  recieveEvent(data) {
    if (this.events.includes(data.event) && (!has(this.condition, data.event) || this.condition[data.event](this.id, data))) {
      this.processEvent(data)
    }
  }

  processEvent(data) {
    this.queue.push(data)
    if (!this.running) {
      this.process()
    }
  }

  process() {
    if (isFunction(this.reaction) && this.queue.length > 0) {
      this.running = true

      const data = this.queue.shift()
      this.services.event.start(data)
      this.reaction(data, this.services).then(() => {
        this.running = false
        this.services.event.end(data)
        this.process()
      }).catch((e) => {
        this.running = false
        this.services.event.error(data)
        this.process()
      })
    }
  }
}

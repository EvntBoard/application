import { isFunction, has } from 'lodash'

export default class TriggerThrottle {

  constructor(triggerEntity, services) {
    this.id = triggerEntity.id
    this.reaction = triggerEntity.reaction
    this.events = triggerEntity.events
    this.condition = triggerEntity.condition
    this.services = services
    this.running = false
  }

  recieveEvent(data) {
    if (this.events.includes(data.event) && (!has(this.condition, data.event) || this.condition[data.event](this.id, data))) {
      this.processEvent(data)
    }
  }

  processEvent(data) {
    if (isFunction(this.reaction) && !this.running) {
      this.running = true
      this.services.event.start(data)
      this.reaction(data, this.services).then(() => {
        this.running = false
        this.services.event.end(data)
      }).catch((e) => {
        this.running = false
        this.services.event.error(data, e)
      })
    }
  }
}

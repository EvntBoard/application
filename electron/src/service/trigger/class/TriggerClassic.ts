import { isFunction, has } from 'lodash'

export default class TriggerClassic {
  constructor(triggerEntity, services) {
    this.id = triggerEntity.id
    this.reaction = triggerEntity.reaction
    this.events = triggerEntity.events
    this.condition = triggerEntity.condition
    this.services = services
  }

  recieveEvent (data) {
    if (this.events.includes(data.event) && (!has(this.condition, data.event) || this.condition[data.event](this.id, data))) {
      this.processEvent(data)
    }
  }

  processEvent(data) {
    if (isFunction(this.reaction)) {
      this.services.event.start(data)
      this.reaction(data, this.services).then(() => {
        this.services.event.end(data)
      }).catch((e) => {
        this.services.event.error(data, e)
      })
    }
  }
}

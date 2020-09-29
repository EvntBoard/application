import requireFromString from 'require-from-string'
import { v4 as uuid } from 'uuid'
import { isArray, has } from 'lodash'

import logger from '../../logger'
import model from '../../model/trigger'
import triggerBuilder from './triggerBuilder'
import * as shortcutService from '../shortcut'
import service from './service'

let triggersRunning = null

const addTrigger = (trigger) => {
  try {
    const events = trigger.events.map(i => i.event)
    const eventsCondition = trigger.events.reduce((acc, i) => {
      acc[i.event] = requireFromString(i.condition)
      return acc
    }, {})

    events.map(i => {
      if (i.includes('shortcut:')) {
        shortcutService.registerShortcut(i.replace('shortcut:', ''))
      }
    })

    triggersRunning.set(trigger.id, triggerBuilder({
      ...trigger,
      type: parseInt(trigger.type, 10),
      events,
      condition: eventsCondition,
      reaction: requireFromString(trigger.reaction)
    }, {
      ...service,
      event: {
        new: newEvent,
        start: startEvent,
        end: endEvent,
        error: errorEvent
      }
    }))
    logger.debug(`Load trigger [${trigger.id}] ${trigger.name}`)
  } catch (e) {
    logger.error(e)
    logger.error(`No module found for ${trigger.id}`)
  }
}

export const load = (trigger) => {
  addTrigger(trigger)
}

export const reload = (trigger) => {
  unload(trigger)
  addTrigger(trigger)
}

export const unload = (trigger) => {
  logger.debug(`Unload trigger [${trigger.id}] ${trigger.name}`)
  const triggerEntity = triggersRunning.get(trigger.id)
  if (triggerEntity && triggerEntity.events && isArray(triggerEntity.events)) {
    triggerEntity.events.forEach(i => {
      if (i.includes('shortcut:')) {
        shortcutService.unregisterShortcut(i.replace('shortcut:', ''))
      }
    })
  }
  triggersRunning.delete(trigger.id)
}

export const unloadAll = () => {
  triggersRunning.forEach(i => {
    unload(i)
  })
  triggersRunning = new Map()
}

export const newEvent = (data) => {
  if (has(data, 'event')) {
    const uniqueId = uuid()
    data.event !== 'obs-stream-status' && logger.debug(`New event [${uniqueId}] ${data.event}`)
    triggersRunning.forEach(i => {
      i.recieveEvent({...data, uniqueId})
    })
  } else {
    logger.error('Can\'t generate an event with no \'event\' key ... ')
  }
}

export const startEvent = (data) => {
  logger.debug(`start event [${data.uniqueId}] ${data.event}`)
}

export const errorEvent = (data, e) => {
  logger.error(`error event [${data.uniqueId}] ${data.event}`)
  logger.error(`${e.name} : ${e.message}`)
  console.log(e)
}

export const endEvent = (data) => {
  logger.debug(`end event [${data.uniqueId}] ${data.event}`)
}

export const initTriggers = () => {
  const data = model.read()
  triggersRunning = new Map()
  if (isArray(data)) {
    data.map(trigger => { addTrigger(trigger) })
  }
}

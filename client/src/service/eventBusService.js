export const eventBusOnNew = (callback) => {
  window.app.eventBus.onNew(callback)
}

export const eventBusOnStart = (callback) => {
  window.app.eventBus.onStart(callback)
}

export const eventBusOnEnd = (callback) => {
  window.app.eventBus.onEnd(callback)
}

export const eventBusOnError = (callback) => {
  window.app.eventBus.onError(callback)
}

export const eventBusNewEvent = (event) => {
  window.app.eventBus.newEvent(event)
}

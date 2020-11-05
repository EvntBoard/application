export const triggerManagerOnNew = (callback) => {
  window.app.triggerManager.onNew(callback)
}

export const triggerManagerOnStart = (callback) => {
  window.app.triggerManager.onStart(callback)
}

export const triggerManagerOnEnd = (callback) => {
  window.app.triggerManager.onEnd(callback)
}

export const triggerManagerOnError = (callback) => {
  window.app.triggerManager.onError(callback)
}

export const triggerManageNewEvent = (event) => {
  window.app.triggerManager.newEvent(event)
}

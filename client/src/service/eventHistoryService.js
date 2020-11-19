export const eventHistoryGet = () => {
  return window.app.eventHistory.get()
}

export const eventHistoryGetProcess = () => {
  return window.app.eventHistory.getProcess()
}

export const eventHistoryOnNew = (callback) => {
  window.app.eventHistory.onNew(callback)
}

export const eventHistoryOnStart = (callback) => {
  window.app.eventHistory.onStart(callback)
}

export const eventHistoryOnEnd = (callback) => {
  window.app.eventHistory.onEnd(callback)
}

export const eventHistoryOnError = (callback) => {
  window.app.eventHistory.onError(callback)
}

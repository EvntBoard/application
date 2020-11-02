export const webServerGetStatus = async () => {
  return await window.app.webServer.getStatus()
}

export const webServerOnOpen = (callback) => {
  window.app.webServer.onOpen(callback)
}

export const webServerOnClose = (callback) => {
  window.app.webServer.onClose(callback)
}

export const webServerOnError = (callback) => {
  window.app.webServer.onError(callback)
}

export const webServerOpenApp = () => {
  window.app.webServer.openApp()
}

export const webServerGetUrl = async () => {
  return await window.app.webServer.getUrl()
}

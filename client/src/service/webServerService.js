export const webServerGetStatus = async () => {
  return await window.app.webServer.getStatus()
}

export const listenWebServerStatusChange = (callback) => {
  window.app.webServer.listenStatusChange(callback)
}

export const unlistenWebServerStatusChange = () => {
  window.app.webServer.unlistenStatusChange()
}

export const webServerOpenApp = () => {
  window.app.webServer.openApp()
}

export const webServerGetUrl = async () => {
  return await window.app.webServer.getUrl()
}

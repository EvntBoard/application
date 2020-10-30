export const webServerGetStatus = async () => {
  return await window.app.webServer.getStatus()
}

export const listenWebServerStatusChange = (callback) => {
  window.app.webServer.listenStatusChange(callback)
}

export const unlistenWebServerStatusChange = () => {
  window.app.webServer.unlistenStatusChange()
}

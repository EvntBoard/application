export const debugConfigGet = async () => {
  return await window.app.debugConfig.get()
}

export const debugConfigSet = async (appConfig) => {
  return await window.app.debugConfig.set(appConfig)
}

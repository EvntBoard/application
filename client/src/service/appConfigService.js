export const appConfigGet = async () => {
  return await window.app.appConfig.get()
}

export const appConfigSet = async (appConfig) => {
  return await window.app.appConfig.set(appConfig)
}

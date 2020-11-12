export const pluginManagerInfo = async (plugin) => {
  return await window.app.pluginManager.info(plugin)
}

export const pluginManagerPreload = async (plugin) => {
  return await window.app.pluginManager.preload(plugin)
}

export const pluginManagerReload = async (plugin) => {
  return await window.app.pluginManager.reload(plugin)
}

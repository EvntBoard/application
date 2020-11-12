export const pluginManagerInfo = async (plugin) => {
  return await window.app.pluginManager.info(plugin)
}

export const pluginManagerReload = async (plugin) => {
  return await window.app.pluginManager.reload(plugin)
}

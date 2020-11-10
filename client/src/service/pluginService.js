export const pluginAdd = async (plugin) => {
  return await window.app.plugin.add(plugin)
}

export const pluginGet = async () => {
  return await window.app.plugin.get()
}

export const pluginRemove = async (plugin) => {
  return await window.app.plugin.remove(plugin)
}

export const pluginReload = async (plugin) => {
  return await window.app.plugin.reload(plugin)
}

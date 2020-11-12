export const pluginInstanceManagerReload = async (pluginInstance) => {
  return await window.app.pluginInstanceManager.reload(pluginInstance)
}

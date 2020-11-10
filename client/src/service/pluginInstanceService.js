export const pluginInstanceCreate = async (pluginInstance) => {
  return await window.app.pluginInstance.create(pluginInstance)
}

export const pluginInstanceFindAll = async () => {
  return await window.app.pluginInstance.findAll()
}

export const pluginInstanceFindOne = async (id) => {
  return await window.app.pluginInstance.findOne(id)
}

export const pluginInstanceUpdate = async (pluginInstance) => {
  return await window.app.pluginInstance.update(pluginInstance)
}

export const pluginInstanceDelete = async (pluginInstance) => {
  return await window.app.pluginInstance.delete(pluginInstance)
}

export const pluginInstanceReload = async (pluginInstance) => {
  return await window.app.pluginInstance.reload(pluginInstance)
}

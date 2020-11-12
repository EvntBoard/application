export const pluginCreate = async (plugin) => {
  return await window.app.plugin.create(plugin)
}

export const pluginFindAll = async () => {
  return await window.app.plugin.findAll()
}

export const pluginFindOne = async (id) => {
  return await window.app.plugin.findOne(id)
}

export const pluginUpdate = async (plugin) => {
  return await window.app.plugin.update(plugin)
}

export const pluginDelete = async (plugin) => {
  return await window.app.plugin.delete(plugin)
}

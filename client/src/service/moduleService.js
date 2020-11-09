export const moduleCreate = async (module) => {
  return await window.app.module.create(module)
}

export const moduleFindAll = async () => {
  return await window.app.module.findAll()
}

export const moduleFindOne = async (id) => {
  return await window.app.module.findOne(id)
}

export const moduleUpdate = async (module) => {
  return await window.app.module.update(module)
}

export const moduleDelete = async (module) => {
  return await window.app.module.delete(module)
}

export const triggerCreate = async (trigger) => {
  return await window.app.trigger.create(trigger)
}

export const triggerFindAll = async () => {
  return await window.app.trigger.findAll()
}

export const triggerFindOne = async (id) => {
  return await window.app.trigger.findOne(id)
}

export const triggerUpdate = async (trigger) => {
  return await window.app.trigger.update(trigger)
}

export const triggerDelete = async (trigger) => {
  return await window.app.trigger.delete(trigger)
}

export const triggerEditFile = (trigger) => {
  window.app.trigger.editFile(trigger)
}


export const triggerReload = (trigger) => {
  window.app.trigger.reload(trigger)
}

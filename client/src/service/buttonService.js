export const buttonCreate = async (button) => {
  return await window.app.button.create(button)
}

export const buttonFindAll = async () => {
  return await window.app.button.findAll()
}

export const buttonFindAllForBoardId = async (id) => {
  return await window.app.button.findAllForBoardId(id)
}

export const buttonFindOne = async (id) => {
  return await window.app.button.findOne(id)
}

export const buttonUpdate = async (button) => {
  return await window.app.button.update(button)
}

export const buttonDelete = async (button) => {
  return await window.app.button.delete(button)
}

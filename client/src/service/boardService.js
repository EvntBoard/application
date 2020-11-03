export const boardCreate = async (board) => {
  return await window.app.board.create(board)
}

export const boardFindAll = async () => {
  return await window.app.board.findAll()
}

export const boardFindOne = async (id) => {
  return await window.app.board.findOne(id)
}

export const boardUpdate = async (board) => {
  return await window.app.board.update(board)
}

export const boardSetDefault = async (board) => {
  return await window.app.board.setDefault(board)
}

export const boardDelete = async (board) => {
  return await window.app.board.delete(board)
}

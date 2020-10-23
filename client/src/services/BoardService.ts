import { IBoard } from '../shared/types'

export const boardCreate = (board: IBoard): Promise<IBoard> => {
  return (window as any).app.board.create(board)
}

export const boardFindAll = (): Promise<IBoard[]> => {
  return (window as any).app.board.findAll()
}

export const boardFindOne = (id: string): Promise<IBoard> => {
  return (window as any).app.board.findOne(id)
}

export const boardUpdate = (data: IBoard): Promise<IBoard> => {
  return (window as any).app.board.update(data)
}

export const boardDelete = (data: IBoard): Promise<void> => {
  return (window as any).app.board.delete(data)
}

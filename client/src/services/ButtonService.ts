import { IButton } from '../shared/types'

export const buttonCreate = (button: IButton): Promise<IButton> => {
  return (window as any).app.button.create(button)
}

export const buttonFindAll = (): Promise<IButton[]> => {
  return (window as any).app.button.findAll()
}

export const buttonFindOne = (id: string): Promise<IButton> => {
  return (window as any).app.button.findOne(id)
}

export const buttonUpdate = (data: IButton): Promise<IButton> => {
  return (window as any).app.button.update(data)
}

export const buttonDelete = (data: IButton): Promise<void> => {
  return (window as any).app.button.delete(data)
}

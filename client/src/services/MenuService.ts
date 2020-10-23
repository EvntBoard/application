import { IMenu } from '../shared/types'

export const menuGet = (): Promise<IMenu> => {
  return (window as any).app.menu.get()
}

export const menuSet = (menu: IMenu): Promise<IMenu> => {
  return (window as any).app.menu.set(menu)
}

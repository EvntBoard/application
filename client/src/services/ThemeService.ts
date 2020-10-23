import { ITheme } from '../shared/types'

export const themeGet = (): Promise<ITheme> => {
  return (window as any).app.theme.get()
}

export const themeSet = (theme: ITheme): Promise<ITheme> => {
  return (window as any).app.theme.set(theme)
}

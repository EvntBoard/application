import {ITheme} from '../shared/types'

export const themeGet = async (): Promise<ITheme> => {
  const theme: ITheme = await (window as any).app.theme.get()
  applyTheme(theme)
  return theme
}

export const themeSet = async (theme: ITheme): Promise<ITheme> => {
  const newTheme: ITheme = await (window as any).app.theme.set(theme)
  applyTheme(newTheme)
  return newTheme
}


const applyTheme = (theme: ITheme) => {
  const body = document.body
  if (theme === ITheme.DARK) {
    body.classList.add('bp3-dark');
  } else {
    body.classList.remove('bp3-dark');
  }
}

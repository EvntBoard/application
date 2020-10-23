import { ILang } from '../shared/types'

export const langGet = (): Promise<ILang> => {
  return (window as any).app.lang.get()
}

export const langSet = (lang: ILang): Promise<ILang> => {
  return (window as any).app.lang.set(lang)
}

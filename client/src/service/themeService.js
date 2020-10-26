export const themeGet = async () => {
  return await window.app.theme.get()
}

export const themeSet = async (theme) => {
  return await window.app.theme.set(theme)
}

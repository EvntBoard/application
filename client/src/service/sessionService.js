export const sessionGet = async (session) => {
  return await window.app.session.get(session)
}

export const sessionOnChange = (callback) => {
  window.app.session.onChange(callback)
}


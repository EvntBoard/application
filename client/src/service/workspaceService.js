export const workspaceGetCurrent = async () => {
  return await window.app.workspace.getCurrent()
}

export const workspaceGetAll = async () => {
  return await window.app.workspace.getAll()
}

export const workspaceSwitch = async (workspace) => {
  return await window.app.workspace.switch(workspace)
}

export const workspaceOpenCurrent = async () => {
  return await window.app.workspace.openCurrent()
}

export const workspaceSelectNew = async () => {
  return await window.app.workspace.selectNew()
}

export const workspaceOnChange = (callback) => {
  window.app.workspace.onChange(callback)
}

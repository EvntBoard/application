import React, { useState } from 'react'
import { Button, Classes, Dialog } from '@blueprintjs/core'
import intl from "react-intl-universal"

const ModalWorkspace = ({ open, setOpen, workspace, setWorkspace }) => {
  const [newWorkspace, setNewWorkspace] = useState(workspace)

  const onSelectWorkspace = () => {
    window.app.utils.dir().then((data) => {
      setNewWorkspace(data.filePaths[0])
    })
  }

  const onClickClose = () => {
    setOpen(false)
  }

  const onClickValidate = () => {
    window.app.workspace.set(newWorkspace).then(data => {
      setWorkspace(data)
      window.app.config.get('dark')
      onClickClose()
    })
  }


  if (!open) {
    return null
  }

  return (
    <Dialog isOpen={open} onClose={onClickClose}>
      <div className={Classes.DIALOG_HEADER} style={{ display: 'flex' }}>
        <h3 style={{ flexGrow: 1 }} className="bp3-heading">{intl.get('app.admin.workspace.modal.title')}</h3>
        <Button icon='cross' minimal onClick={onClickClose} />
      </div>

      <div className={Classes.DIALOG_BODY}>
        <Button onClick={onSelectWorkspace}>{intl.get('app.admin.workspace.modal.select')}</Button>

      </div>

      {newWorkspace && (<div>{intl.get('app.admin.workspace.modal.select', { from: workspace , to: newWorkspace })}</div>)}

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClickClose}>
            {intl.get('app.admin.workspace.modal.button.reset')}
          </Button>
          <Button onClick={onClickValidate}>
            {intl.get('app.admin.workspace.modal.button.submit')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default ModalWorkspace

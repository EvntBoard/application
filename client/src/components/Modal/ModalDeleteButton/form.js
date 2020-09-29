import React from 'react'
import { Button, Classes } from '@blueprintjs/core'
import intl from "react-intl-universal"

export default ({ handleSubmit, onReset, setOpen, submitting }) => {

  const onClickClose = () => {
    setOpen(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={Classes.DIALOG_HEADER} style={{ display: 'flex' }}>
        <h3 style={{ flexGrow: 1 }} className="bp3-heading">{intl.get('app.modal.button_delete.title')}</h3>
        <Button icon='cross' minimal onClick={onClickClose} />
      </div>

      <div className={Classes.DIALOG_BODY}>
        {intl.get('app.modal.button_delete.title')}
      </div>

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onReset}>
            {intl.get('app.modal.button_delete.button_reset')}
          </Button>
          <Button type="submit" disabled={submitting}>
            {intl.get('app.modal.button_delete.button_delete')}
          </Button>
        </div>
      </div>
    </form>
  )
}

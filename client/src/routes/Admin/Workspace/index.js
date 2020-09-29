import React, { useEffect, useState } from 'react'
import { Button } from '@blueprintjs/core'

import ModalWorkspace from './Modal'
import intl from "react-intl-universal"

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenWork, setIsOpenWork] = useState(false)
  const [workspace, setWorkspace] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    window.app.workspace.get().then(data => {
      setWorkspace(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return null
  }

  const onClickModalWorkspace = () => {
    window.app.workspace.get().then(data => {
      setWorkspace(data)
    })
    setIsOpenWork(true)
  }

  return (
    <div>
      <ModalWorkspace open={isOpenWork} setOpen={setIsOpenWork} workspace={workspace} setWorkspace={setWorkspace} />
      <h1>{intl.get('app.admin.workspace.title')}</h1>
      <div className='mb-8'>
        {intl.get('app.admin.workspace.current')} <code>{workspace}</code>
      </div>
      <Button onClick={onClickModalWorkspace}>
        {intl.get('app.admin.workspace.change')}
      </Button>
    </div>
  )
}

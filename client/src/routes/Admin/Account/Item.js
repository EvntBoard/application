import React from 'react'
import {Button, Tag} from '@blueprintjs/core'
import intl from "react-intl-universal"

export default ({ data }) => {

  const innerOnReload = () => {
    window.app.account.reload(data)
  }

  const innerOnDelete = () => {
    window.app.account.delete(data)
  }

  return (
    <div className='flex'>
      <div className='m-2'>
        {data.type}
      </div>
      <div className='m-2'>
        <Tag intent={data && data.status ? 'success' : 'danger'}>{ data && data.status ? intl.get('app.admin.account.connected') : intl.get('app.admin.account.disconnected') }</Tag>
      </div>
      <Button minimal icon='refresh' onClick={innerOnReload} />
      <Button minimal icon='cross' intent='danger' onClick={innerOnDelete} />
    </div>
  )
}

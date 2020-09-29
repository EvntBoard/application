import React, { useEffect, useState } from 'react'
import { find } from 'lodash'
import intl from 'react-intl-universal'
import { Button } from '@blueprintjs/core'

import Item from './Item'
import {useInterval} from '../../../utils/hooks'

export default () => {
  const [selectValue, setSelectValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    setIsLoading(true)
    window.app.account.read().then((data) => {
      setAccounts(data)
      setIsLoading(false)
    })
  }, [])

  useInterval(() => {
    window.app.account.read().then((data) => {
      setAccounts(data)
    })
  }, 2000)

  const innerOnChange = (e) => {
    setSelectValue(e.target.value)
  }

  const onClickAddAccount = () => {
    if (find(accounts, { type: 'twitch-main' }) === undefined) {
      window.app.account.connect(selectValue).then((data) => {
        if (!(data instanceof Error)) {
          setAccounts([
            ...accounts,
            data
          ])
          setSelectValue(null)
        } else {
          console.log(data)
        }
      })
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <div>
      <h1>{intl.get('app.admin.account.title')}</h1>
      <div className="bp3-select">
        <select value={selectValue} onChange={innerOnChange}>
          <option value="">Choose an item...</option>
          <option disabled={find(accounts, { type: 'twitch-main' }) !== undefined} value="twitch-main">Twitch</option>
        </select>
      </div>
      <Button onClick={onClickAddAccount}>Ajouter</Button>
      <div>
        {
          accounts && accounts.map(i => <Item key={i.id} data={i} />)
        }
      </div>
    </div>
  )
}

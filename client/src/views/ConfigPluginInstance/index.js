import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { toUpper } from 'lodash'
import { Form } from 'react-final-form'
import { Button, TextField } from '@material-ui/core'

import FormTrigger from './form'
import Item from './Item'
import { pluginInstanceUpdate, pluginInstanceDelete, pluginInstanceCreate, pluginInstanceFindAll, selectors as pluginISelectors } from "../../store/pluginInstance";
import M from '../../messages/constants'

import './assets/style.scss'

const Trigger = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const modules = useSelector(pluginISelectors.pluginInstances)
  const [current, setCurrent] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(pluginInstanceFindAll())
  }, [dispatch])

  const onSubmitFormTrigger = async (data) => {
    dispatch(pluginInstanceUpdate(data))
    return true
  }

  const onClickCreate = () => {
    dispatch(pluginInstanceCreate({}))
  }

  const onDeleteTrigger = (data) => {
    dispatch(pluginInstanceDelete(data))
    setCurrent(null)
  }

  const onReset = () => {
    setCurrent(null)
  }


  const onClickItem = (i) => {
    setCurrent(i)
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const searchFilter = useCallback((i) => {
   return (toUpper(i.name).includes(toUpper(search))) || (toUpper(i.description).includes(search))
  }, [search])

  return (
    <div className='module app-content'>
      <div className='list'>
        <div className='search'>
          <TextField value={search} onChange={onChangeSearch} placeholder={intl.formatMessage({ id: M.AppTriggerSearch })} />
        </div>
        <div className='items'>
          {modules.filter(searchFilter).map(i => <Item
            key={i.id}
            active={current && current.id === i.id}
            module={i}
            onClick={onClickItem}
            onDelete={onDeleteTrigger}
          />)}
        </div>
        <div className='actions'>
          <Button variant='contained' style={{ flexGrow: 1 }} onClick={onClickCreate}>{intl.formatMessage({ id: M.AppTriggerButtonCreate })}</Button>
        </div>
      </div>
      <div className='form'>
        {
          current && (
            <Form
              initialValues={current}
              onReset={onReset}
              onSubmit={onSubmitFormTrigger}
              component={FormTrigger}
            />
          )
        }
      </div>
    </div>
  )
}

export default Trigger

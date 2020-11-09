import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { toUpper } from 'lodash'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Button, TextField } from '@material-ui/core'

import FormTrigger from './form'
import Item from './Item'
import { moduleCreate, moduleDelete, moduleFindAll, moduleUpdate, selectors as moduleSelectors } from "../../store/module";
import M from '../../messages/constants'

import './assets/style.scss'

const SAMPLE_TRIGGER = {
  id: null,
  type: 1,
  locker: null,
  name: 'New Trigger',
  description: null,
}

const Trigger = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const modules = useSelector(moduleSelectors.moduleSelector)
  const [current, setCurrent] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(moduleFindAll())
  }, [dispatch])

  const onSubmitFormTrigger = async (data) => {
    dispatch(moduleUpdate(data))
    return true
  }

  const onClickCreate = () => {
    dispatch(moduleCreate({...SAMPLE_TRIGGER, }))
  }

  const onDeleteTrigger = (data) => {
    dispatch(moduleDelete(data))
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

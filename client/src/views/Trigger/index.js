import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { toUpper } from 'lodash'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Button, TextField } from '@material-ui/core'

import FormTrigger from './form'
import Item from './Item'
import { triggerCreate, triggerDelete, triggerFindAll, triggerUpdate, triggerDuplicate, selectors as triggerSelectors } from "../../store/trigger";
import { triggerEditFile, triggerReload } from '../../service/triggerService'
import M from '../../messages/constants'

import './assets/style.scss'
const SAMPLE_TRIGGER = {
  id: null,
  type: 1,
  locker: null,
  name: 'New Trigger',
  description: '',
}

const Trigger = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const triggers = useSelector(triggerSelectors.triggers)
  const [current, setCurrent] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(triggerFindAll())
  }, [dispatch])

  const onSubmitFormTrigger = async (data) => {
    dispatch(triggerUpdate(data))
    setCurrent(null)
    return true
  }

  const onClickCreate = () => {
    dispatch(triggerCreate({...SAMPLE_TRIGGER, }))
    setCurrent(null)
  }

  const onDeleteTrigger = (data) => {
    dispatch(triggerDelete(data))
    setCurrent(null)
  }

  const onDupplicateTrigger = (data) => {
    dispatch(triggerDuplicate(data))
  }

  const onReset = () => {
    setCurrent(null)
  }

  const onEditFile = (trigger) => {
    triggerEditFile(trigger)
  }

  const onReload = (trigger) => {
    triggerReload(trigger)
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
    <div className='trigger app-content'>
      <div className='list'>
        <div className='search'>
          <TextField value={search} onChange={onChangeSearch} placeholder={intl.formatMessage({ id: M.AppTriggerSearch })} />
        </div>
        <div className='items'>
          {triggers.filter(searchFilter).map(i => <Item
            key={i.id}
            active={current && current.id === i.id}
            trigger={i}
            onClick={onClickItem}
            onDupplicate={onDupplicateTrigger}
            onDelete={onDeleteTrigger}
            onReload={onReload}
            onEditFile={onEditFile}
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
              mutators={{ ...arrayMutators }}
              initialValues={current}
              onReset={onReset}
              onEditFile={onEditFile}
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

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toUpper } from 'lodash'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Button, TextField } from '@material-ui/core'

import FormTrigger from './form'
import Item from './Item'
import { triggerCreate, triggerDelete, triggerFindAll, triggerUpdate, selectors as triggerSelectors } from "../../store/trigger";

import './assets/style.scss'

const SAMPLE_TRIGGER = {
  id: null,
  type: 1,
  locker: null,
  name: 'New Trigger',
  description: null,
  events: [{ event: 'click', condition: `module.exports = (triggerId, evntData) => triggerId === evntData.id_trigger` }],
  reaction: `module.exports = async (data, services) => {\n  services.utils.log('test')\n}`
}

const Trigger = () => {
  const dispatch = useDispatch()
  const triggers = useSelector(triggerSelectors.triggerSelector)
  const [current, setCurrent] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(triggerFindAll())
  }, [])

  const onSubmitFormTrigger = async (data) => {
    dispatch(triggerUpdate(data))
    return true
  }

  const onClickCreate = () => {
    dispatch(triggerCreate({...SAMPLE_TRIGGER, }))
  }

  const onDeleteTrigger = (data) => {
    dispatch(triggerDelete(data))
    setCurrent(null)
  }

  const onDupplicateTrigger = (data) => {
    dispatch(triggerCreate({...data, id: null, name: `DUP-${data.name}` }))
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
    <div className='trigger app-content'>
      <div className='list'>
        <div className='search'>
          <TextField value={search} onChange={onChangeSearch} placeholder='Recherche ...' />
        </div>
        <div className='items'>
          {triggers.filter(searchFilter).map(i => <Item
            key={i.id}
            active={current && current.id === i.id}
            trigger={i}
            onClick={onClickItem}
            onDupplicate={onDupplicateTrigger}
            onDelete={onDeleteTrigger}
          />)}
        </div>
        <div className='actions'>
          <Button style={{ flexGrow: 1 }} onClick={onClickCreate}>Créer un trigger</Button>
        </div>
      </div>
      <div className='form'>
        {
          current && (
            <Form
              mutators={{ ...arrayMutators }}
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

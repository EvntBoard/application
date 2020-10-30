import React, { useCallback, useEffect, useState } from 'react'
import { remove, toUpper } from 'lodash'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Button, TextField } from '@material-ui/core'

import FormTrigger from './form'
import Item from './Item'

import './assets/style.scss'
import { triggerCreate, triggerDelete, triggerFindAll, triggerUpdate } from "../../service/triggerService";

const SAMPLE_TRIGGER = {
  id: null,
  type: 1,
  locker: null,
  name: 'New Trigger',
  description: null,
  events: [{ event: 'click', condition: `module.exports = (triggerId, evntData) => triggerId === evntData.id_trigger` }],
  reaction: `module.exports = async (data, services) => {\n  services.utils.log('test')\n}`
}

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [triggers, setTriggers] = useState([])
  const [current, setCurrent] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setIsLoading(true)
    triggerFindAll().then((data) => {
      setTriggers(data)
      setIsLoading(false)
    })
  }, [])

  const onSubmitFormTrigger = async (data) => {
    triggerUpdate(data).then((result) => {
      const refresh = remove(triggers, (i) => i.id !== result.id)
      setTriggers([
        ...refresh,
        result
      ])
      setCurrent(null)
    })
    return true
  }

  const onClickCreate = () => {
    triggerCreate({...SAMPLE_TRIGGER, }).then((result) => {
      setTriggers([
        ...triggers,
        result
      ])
    })
  }

  const onDeleteTrigger = (data) => {
    triggerDelete(data).then(() => {
      const refresh = remove(triggers, (i) => i.id !== data.id)
      setTriggers([...refresh])
      setCurrent(null)
    })
  }

  const onDupplicateTrigger = (data) => {
    triggerCreate({...data, id: null, name: `DUP-${data.name}` }).then((result) => {
      setTriggers([
        ...triggers,
        result
      ])
    })
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

  if (isLoading) {
    return <div>Loading ..</div>
  }

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
          <Button onClick={onClickCreate}>Créer un trigger</Button>
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

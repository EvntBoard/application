import React, { useCallback, useEffect, useState } from 'react'
import { remove, toUpper } from 'lodash'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Spinner, InputGroup } from '@blueprintjs/core'

import FormTemplate from './form'
import Item from './Item'

import './assets/style.scss'
import intl from "react-intl-universal"

const SAMPLE_TRIGGER = {
  id: null,
  name: null,
  description: null,
  events: []
}

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [templates, setTemplates] = useState([])
  const [current, setCurrent] = useState({...SAMPLE_TRIGGER})
  const [search, setSearch] = useState('')

  useEffect(() => {
    setIsLoading(true)
    window.app.template.read().then((data) => {
      setTemplates(data)
      setIsLoading(false)
    })
  }, [])


  const onSubmitFormTemplate = async (data) => {
    if (data.id) {
      window.app.template.update(data).then((result) => {
        const refresh = remove(templates, (i) => i.id !== result.id)
        setTemplates([
          ...refresh,
          result
        ])
      })
    } else {
      window.app.template.create(data).then((result) => {
        setTemplates([
          ...templates,
          result
        ])
      })
    }

    setCurrent(SAMPLE_TRIGGER)
  }

  const onDeleteTemplate = (data) => {
    window.app.template.delete(data).then((result) => {
      if (result) {
        const refresh = remove(templates, (i) => i.id !== data.id)
        setTemplates([...refresh])
        setCurrent({...SAMPLE_TRIGGER})
      }
    })
  }

  const onReset = () => {
    setCurrent({...SAMPLE_TRIGGER})
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
    return <Spinner />
  }

  return (
    <div className='template app-content'>
      <div className='list'>
        <div className='search'>
          <InputGroup value={search} onChange={onChangeSearch} placeholder={intl.get('app.template.search_placeholder')} />
        </div>
        <div className='items'>
          {templates.filter(searchFilter).map(i => <Item key={i.id} active={current && current.id === i.id} template={i} onClick={onClickItem} />)}
        </div>
      </div>
      <div className='form'>
        <Form
          mutators={{ ...arrayMutators }}
          initialValues={current}
          onReset={onReset}
          onSubmit={onSubmitFormTemplate}
          component={FormTemplate}
          onDelete={onDeleteTemplate}
        />
      </div>
    </div>
  )
}

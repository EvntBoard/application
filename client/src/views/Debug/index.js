import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper } from '@material-ui/core'

import { triggerFindAll } from '../../store/trigger'
import { selectors as historySelectors } from '../../store/eventHistory'
import ModalPayload from './ModalPayload'
import VirtualizedTable from './VirtualizedTable'

import 'react-virtualized/styles.css';
import './assets/style.scss'

const Debug = () => {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)
  const dispatch = useDispatch()
  const data = useSelector(historySelectors.events)

  useEffect(() => {
    dispatch(triggerFindAll())
  }, [])

  const onClickAction = (data) => {
    setCurrent(data)
    setOpen(true)
  }

  return (
    <>
      <ModalPayload open={open} setOpen={setOpen} current={current} />
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <Paper style={{ height: '100%', width: '100%' }}>
          <VirtualizedTable
            data={data}
            onClickAction={onClickAction}
          />
        </Paper>
      </div>
    </>
  );
}

export default Debug;

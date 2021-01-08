import React, {useEffect, useMemo, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Paper, TextField } from '@material-ui/core'
import { isBefore, isAfter, isValid } from 'date-fns'
import { isNull, isEmpty } from 'lodash'
import { useIntl } from 'react-intl'

import { triggerFindAll } from '../../store/trigger'
import { selectors as historySelectors } from '../../store/eventHistory'
import ModalPayload from './ModalPayload'
import VirtualizedTable from './VirtualizedTable'

import 'react-virtualized/styles.css';
import './assets/style.scss'
import M from "../../messages/constants";

const Debug = () => {
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)
  const [evntSearch, setEvntSearch] = useState('')
  const [evntStartDate, setEvntStartDate] = useState(null)
  const [evntEndDate, setEvntEndDate] = useState(null)

  const dispatch = useDispatch()
  const data = useSelector(historySelectors.events)

  useEffect(() => {
    dispatch(triggerFindAll())
  }, [])

  const onClickAction = (data) => {
    setCurrent(data)
    setOpen(true)
  }

  const onEvntSearchChange = (e) => {
    setEvntSearch(e.target.value)
  }

  const onEvntStartDateChange = (e) => {
    setEvntStartDate(e.target.value)
  }

  const onEvntEndDateChange = (e) => {
    setEvntEndDate(e.target.value)
  }

  const dataFiltered = useMemo(() => {
    let filteredData = data.filter(i => i.event.includes(evntSearch))

    if (!isNull(evntStartDate) && !isEmpty(evntStartDate)) {
      const startDate = new Date(evntStartDate)
      if (isValid(startDate)) {
        filteredData = filteredData.filter(i => isAfter(i.emittedAt, startDate))
      }
    }

    if (!isNull(evntEndDate) && !isEmpty(evntEndDate)) {
      const endDate = new Date(evntEndDate)
      if (isValid(endDate)) {
        filteredData = filteredData.filter(i => isBefore(i.emittedAt, endDate))
      }
    }

    return filteredData
  }, [data, evntSearch, evntStartDate, evntEndDate])

  return (
    <>
      <ModalPayload open={open} setOpen={setOpen} current={current} />
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <Grid container style={{ padding: 4 }}>
          <Grid container item xs={4}>
            <TextField label={intl.formatMessage({ id: M.AppDebugFilterEvent })} value={evntSearch} onChange={onEvntSearchChange} />
          </Grid>
          <Grid container item xs={4}>
            <TextField
              label={intl.formatMessage({ id: M.AppDebugFilterStartDate })}
              type="datetime-local"
              value={evntStartDate}
              onChange={onEvntStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid container item xs={4}>
            <TextField
              label={intl.formatMessage({ id: M.AppDebugFilterEndDate })}
              type="datetime-local"
              value={evntEndDate}
              onChange={onEvntEndDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Paper style={{ height: '100%', width: '100%' }}>
          <VirtualizedTable
            data={dataFiltered}
            onClickAction={onClickAction}
          />
        </Paper>
      </div>
    </>
  );
}

export default Debug;

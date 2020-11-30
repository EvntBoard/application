import React, {useMemo} from 'react'
import {FormattedDate, FormattedTime} from 'react-intl'
import {TableCell, TableRow} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {find} from 'lodash'

import {selectors as triggerSelectors} from '../../store/trigger'

export default ({ process }) => {
  const triggers = useSelector(triggerSelectors.triggers)

  const trigger = useMemo(() => {
    return find(triggers, { id: process.key.idTrigger })
  }, [process.key.idTrigger, triggers])


  return (
    <TableRow>
      <TableCell>{trigger?.name}</TableCell>
      <TableCell>
        { process.value.startDate && (
          <>
            <FormattedDate value={new Date(process.value.startDate)} />
            &nbsp;
            <FormattedTime value={new Date(process.value.startDate)} hour='numeric' minute='numeric' second='numeric' />
            &nbsp;
            {process.value.startDate?.getMilliseconds()}ms
          </>
        )}
      </TableCell>
      <TableCell>
        { process.value.endDate && (
          <>
            <FormattedDate value={new Date(process.value.endDate)} />
            &nbsp;
            <FormattedTime value={new Date(process.value.endDate)} hour='numeric' minute='numeric' second='numeric' />
            &nbsp;
            {process.value.endDate?.getMilliseconds()}ms
          </>
        )}
      </TableCell>
      <TableCell>
        { process.value.errorDate && (
          <>
            <FormattedDate value={new Date(process.value.errorDate)} />
            &nbsp;
            <FormattedTime value={new Date(process.value.errorDate)} hour='numeric' minute='numeric' second='numeric' />
            &nbsp;
            {process.value.errorDate?.getMilliseconds()}ms
          </>
        )}
      </TableCell>
      <TableCell>
        {process.value.error && <pre><code>{process.value.error.name} : {process.value.error.message}</code></pre>}
      </TableCell>
    </TableRow>
  )
}

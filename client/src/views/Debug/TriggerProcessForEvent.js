import React, {useMemo} from 'react'
import {FormattedDate, FormattedTime} from 'react-intl'
import {TableCell, TableRow} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {find} from 'lodash'

import {selectors as triggerSelectors} from '../../store/trigger'

export default ({ process }) => {
  const triggers = useSelector(triggerSelectors.triggers)

  const trigger = useMemo(() => {
    return find(triggers, { id: process.idTrigger })
  }, [process.idTrigger, triggers])


  return (
    <TableRow>
      <TableCell>{trigger?.name}</TableCell>
      <TableCell>
        { process.startDate && (
          <>
            <FormattedDate value={new Date(process.startDate)} />
            &nbsp;
            <FormattedTime value={new Date(process.startDate)} hour='numeric' minute='numeric' second='numeric' />
            &nbsp;
            {process.startDate?.getMilliseconds()}ms
          </>
        )}
      </TableCell>
      <TableCell>
        { process.endDate && (
          <>
            <FormattedDate value={new Date(process.endDate)} />
            &nbsp;
            <FormattedTime value={new Date(process.endDate)} hour='numeric' minute='numeric' second='numeric' />
            &nbsp;
            {process.endDate?.getMilliseconds()}ms
          </>
        )}
      </TableCell>
      <TableCell>
        { process.errorDate && (
          <>
            <FormattedDate value={new Date(process.errorDate)} />
            &nbsp;
            <FormattedTime value={new Date(process.errorDate)} hour='numeric' minute='numeric' second='numeric' />
            &nbsp;
            {process.errorDate?.getMilliseconds()}ms
          </>
        )}
      </TableCell>
      <TableCell>
        {process.error && <pre><code>{process.error.name} : {process.error.message}</code></pre>}
      </TableCell>
    </TableRow>
  )
}

import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {useIntl} from 'react-intl'
import {filter} from 'lodash'
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'

import {selectors} from '../../store/eventHistory'
import TriggerProcessForEvent from './TriggerProcessForEvent'
import M from '../../messages/constants'

export default  ({ id }) => {
  const intl = useIntl()
  const data = useSelector(selectors.process)

  const processed = useMemo(() => {
    return filter(data, (i) => i.key.idEvent === id)
  }, [data, id])

  return (
    <>
      {
        processed.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{intl.formatMessage({ id: M.AppDebugTableTriggerLabel })}</TableCell>
                <TableCell>{intl.formatMessage({ id: M.AppDebugTableTriggerStartDate })}</TableCell>
                <TableCell>{intl.formatMessage({ id: M.AppDebugTableTriggerEndDate })}</TableCell>
                <TableCell>{intl.formatMessage({ id: M.AppDebugTableTriggerErrorDate })}</TableCell>
                <TableCell>{intl.formatMessage({ id: M.AppDebugTableTriggerError })}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processed.map((process) => <TriggerProcessForEvent key={process.key.idTrigger} process={process} />)}
            </TableBody>
          </Table>
        ) : (
          <div>
            {intl.formatMessage({ id: M.AppDebugTableTriggerNoData })}
          </div>
        )
      }
    </>
  )
}

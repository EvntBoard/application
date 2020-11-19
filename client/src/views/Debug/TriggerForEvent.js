import React, {useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {selectors} from '../../store/eventHistory'

import TriggerProcessForEvent from './TriggerProcessForEvent'

export default  ({ row: { original } }) => {
  const data = useSelector(selectors.process)

  const processed = useMemo(() => {
    const processedData = []
    data.forEach((value, key) => {
      if (key.includes(original?.id)) {
        processedData.push({
          idTrigger: key.split(':')[0],
          ...value
        })
      }
    })
    return processedData
  }, [data, original?.id])

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trigger</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Error Date</TableCell>
            <TableCell>Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processed.map((process) => <TriggerProcessForEvent key={process.idTrigger} process={process} />)}
        </TableBody>
      </Table>
    </Paper>
  )
}

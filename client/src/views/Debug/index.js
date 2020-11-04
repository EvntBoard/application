import React from 'react'
import { useSelector } from 'react-redux'
import { FormattedDate, FormattedTime } from 'react-intl';
import { Container, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AlarmIcon from '@material-ui/icons/Alarm';

import { selectors as tmSelectors } from '../../store/triggerManager'

const Debug = () => {

  const data = useSelector(tmSelectors.events)

  return (
    <Container maxWidth={false} className="Debug">
      <TableContainer component={Paper} >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              let StatusComponent
              switch (row.meta.status) {
                case 'start':
                  StatusComponent = () => <AlarmIcon />
                  break
                case 'end':
                  StatusComponent = () => <AlarmOffIcon />
                  break
                case 'error':
                  StatusComponent = () => <Tooltip title={<code>{JSON.stringify(row?.meta?.error?.message)}</code>} aria-label="error"><ErrorOutlineIcon /></Tooltip>
                  break
                case 'new':
                default:
                  StatusComponent = () => <AlarmAddIcon />
                  break
              }
              return (
                <TableRow key={row.meta.uniqueId}>
                  <TableCell>
                    <FormattedDate value={row.meta.newDate} />
                    &nbsp;
                    <FormattedTime value={row.meta.newDate} hour='numeric' minute='numeric' second='numeric' />
                  </TableCell>
                  <TableCell>{row.event}</TableCell>
                  <TableCell><StatusComponent /></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Debug;

import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { selectors as tmSelectors } from '../../store/triggerManager'

const Debug = () => {

  const data = useSelector(tmSelectors.events)

  return (
    <Container maxWidth={false} className="Debug">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Event</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Error</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.meta.uniqueId}>
                <TableCell align="right">{JSON.stringify(row.meta.newDate)}</TableCell>
                <TableCell align="right">{row.event}</TableCell>
                <TableCell align="right">{row.meta.status}</TableCell>
                <TableCell align="right"><code>{JSON.stringify(row?.meta?.error?.message)}</code></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Debug;

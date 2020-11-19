import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTable, useExpanded } from 'react-table'
import { FormattedDate, FormattedTime, useIntl } from 'react-intl'
import {Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { triggerFindAll } from '../../store/trigger'
import { selectors as historySelectors } from '../../store/eventHistory'
import TriggerForEvent from './TriggerForEvent'
import ModalPayload from './ModalPayload'
import M from '../../messages/constants'

import './assets/style.scss'

const Debug = () => {
  const intl = useIntl()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)
  const dispatch = useDispatch()
  const data = useSelector(historySelectors.events)

  useEffect(() => {
    dispatch(triggerFindAll())
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </span>
        ),
      },
      {
        Header: 'Date',
        accessor: 'emittedAt',
        Cell: (cell) => (
          <>
            <FormattedDate value={new Date(cell.value)} />
            &nbsp;
            <FormattedTime value={new Date(cell.value)} hour='numeric' minute='numeric' second='numeric' />
          </>
        )
      },
      {
        Header: 'Event',
        accessor: 'event',
      },
      {
        Header: 'Payload',
        accessor: 'payload',
        Cell: (cell) => {
          const innerOnClick = () => {
            setCurrent(cell.row.original)
            setOpen(true)
          }

          return (
            <IconButton onClick={innerOnClick}>
              <DescriptionIcon />
            </IconButton>
          )
        }
      },
    ],
    []
  )

  const  {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable({ columns, data }, useExpanded)

  return (
    <>
      <ModalPayload open={open} setOpen={setOpen} current={current} />
      <Container maxWidth={false} className="Debug">
        <Table aria-label="simple table" stickyHeader {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <React.Fragment key={row.id}>
                  <TableRow {...row.getRowProps()}>
                    {
                      row.cells.map(cell => {
                        return (
                          <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </TableCell>
                        )
                      })}
                  </TableRow>
                  {row.isExpanded ? (
                    <TableRow>
                      <TableCell colSpan={visibleColumns.length}>
                        <TriggerForEvent row={row} />
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}

export default Debug;

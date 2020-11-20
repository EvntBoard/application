import React from 'react';
import clsx from 'clsx';
import { AutoSizer, Column, Table } from 'react-virtualized';
import {IconButton, TableCell} from '@material-ui/core';
import {FormattedDate, FormattedTime, useIntl} from 'react-intl'
import { withStyles } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';

import M from '../../messages/constants';

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

const MuiVirtualizedTable = ({ onClickAction, classes, rowHeight = 48, headerHeight = 48, onRowClick, data, ...tableProps } ) => {
  const intl = useIntl()

  const getRowClassName = ({ index }) => {
    return clsx(classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  const cellRenderer = ({ cellData, dataKey, rowData }) => {
    let renderer

    switch (dataKey) {
      case 'emittedAt':
        renderer = (
          <>
            <FormattedDate value={new Date(rowData?.emittedAt)} />
            &nbsp;
            <FormattedTime value={new Date(rowData?.emittedAt)} hour='numeric' minute='numeric' second='numeric' />
          </>
        )
        break
      case 'action':
        const innerOnClick = () => {
          onClickAction(rowData)
        }

        renderer = (
          <IconButton onClick={innerOnClick}>
            <DescriptionIcon />
          </IconButton>
        )
        break
      default:
        renderer = cellData
        break
    }

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align='left'
      >
        {renderer}
      </TableCell>
    );
  };

  const headerRenderer = ({ label }) => (
    <TableCell
      component="div"
      className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
      variant="head"
      style={{ height: headerHeight }}
    >
      <span>{label}</span>
    </TableCell>
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={rowHeight}
          gridStyle={{ direction: 'inherit' }}
          headerHeight={headerHeight}
          className={classes.table}
          rowGetter={({ index }) => data[index]}
          rowCount={data.length}
          rowClassName={getRowClassName}
          {...tableProps}
        >
          <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} className={classes.flexContainer} width={(width/12) * 5} dataKey='emittedAt' label={intl.formatMessage({ id: M.AppDebugTableTriggerEmittedAt })} />
          <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} className={classes.flexContainer} width={(width/12) * 5} dataKey='event' label={intl.formatMessage({ id: M.AppDebugTableTriggerEvent })} />
          <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} className={classes.flexContainer} width={(width/12) * 2} dataKey='action' label={intl.formatMessage({ id: M.AppDebugTableTriggerAction })} />
        </Table>
      )}
    </AutoSizer>
  )
}

export default withStyles(styles)(MuiVirtualizedTable);

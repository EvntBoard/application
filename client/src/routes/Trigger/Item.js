import React from 'react'
import { Button, Menu, MenuItem, Popover, Tag } from '@blueprintjs/core'
import cx from 'classnames'

const options = {
  1: 'CLASSIC',
  2: 'THROTTLE',
  3: 'QUEUE',
  4: 'QUEUE LOCK',
}

export default ({ trigger, onClick, onDupplicate, onDelete, active }) => {
  const innerOnClick = () => {
    onClick(trigger)
  }

  const innerOnClickDelete = () => {
    onDelete(trigger)
  }

  const innerOnDupplicate = () => {
    onDupplicate(trigger)
  }

  return (
    <div className={cx('item', { active })}>
      <div className='content' onClick={innerOnClick}>
        <span>{trigger.name}</span>
        <div className='tags'><Tag intent='danger'>{options[trigger.type]}</Tag>{trigger.events.map(i => <Tag key={i.event}>{i.event}</Tag>)}</div>
      </div>
      <div className='actions'>
        <Popover
          content={(
            <Menu>
              <MenuItem icon="duplicate" text="Dupplicate" onClick={innerOnDupplicate} />
              <MenuItem icon="edit" text="Edit" onClick={innerOnClick} />
              <MenuItem icon="trash" text="Trash" onClick={innerOnClickDelete} />
            </Menu>
          )}
          captureDismiss
        >
          <Button style={{ cursor: "pointer" }} minimal icon='more' className='mt-4 mr-8' />
        </Popover>
      </div>
    </div>
  )
}

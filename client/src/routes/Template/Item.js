import React from 'react'
import cx from 'classnames'
import { Tag } from '@blueprintjs/core'

export default ({ template, onClick, active }) => {
  const innerOnClick = () => {
    onClick(template)
  }

  return (
    <div className={cx('item', { active })} onClick={innerOnClick}>
      <span>{template.name}</span>
      <span>{template.description}</span>
      <div className='tags'><Tag>{template.event}</Tag></div>
    </div>
  )
}

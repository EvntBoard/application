import React from 'react'
import cx from 'classnames'

export default ({position, onMouseDown}) => (<div className={cx('preview-handler', position)} onMouseDown={onMouseDown} />)

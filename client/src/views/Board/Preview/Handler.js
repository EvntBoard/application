import React from 'react'
import clsx from 'clsx'

export default ({position, onMouseDown}) => (<div className={clsx('preview-handler', position)} onMouseDown={onMouseDown} />)

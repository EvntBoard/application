import React from 'react'
import clsx from 'clsx'

const Handler = ({position, onMouseDown}) => (<div className={clsx('preview-handler', position)} onMouseDown={onMouseDown} />)

export default Handler

import React, {useEffect, useState} from 'react'
import { Button } from '@blueprintjs/core'

export default () => {
  const [isDark, setDark] = useState(false)

  useEffect(() => {
    window.app.config.get('dark').then((data) => {
      setDark(data)
    })
  }, [])

  const onClickChangeMode = () => {
    window.app.config.set('dark', !isDark).then((data) => {
      setDark(data)
    })
  }

  return (
    <div>
      <h1>Theme</h1>
      <div className='item' onClick={onClickChangeMode}>
        <Button icon={isDark ? 'flash' : 'moon'}>{isDark ? 'Mode light' : 'Mode dark'}</Button>
      </div>
    </div>
  )
}

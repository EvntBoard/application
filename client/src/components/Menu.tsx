import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Icon} from '@blueprintjs/core'
import cx from 'classnames'

import {menuGet, menuSet} from "../services/MenuService";
import {IMenu} from "../shared/types";
import MessageIntl from "./MessageIntl";
import MESSAGE from "../lang/langMessage";

import Logo from './assets/logo.png'
import './assets/style.scss'

export default () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(true)
  const [activeItem, setActiveItem] = useState('home')

  useEffect(() => {
    menuGet().then((data) => {
      setOpen(data === IMenu.OPEN)
    })
  }, [])

  useEffect(() => {
    let pathnameNormalize = pathname.split('/').filter((i) => i !== null && i !== "")[0]

    if (pathnameNormalize === undefined) {
      pathnameNormalize = 'home'
    }

    setActiveItem(pathnameNormalize)
  }, [pathname])

  const onClick = () => {
    menuSet(!open ? IMenu.OPEN : IMenu.CLOSE).then((data) => {
      setOpen(data === IMenu.OPEN)
    })
  }

  return (
    <div className={cx('menu', { full: open })}>
      <div className='list'>
        <div className='header'>
          <img src={Logo} height={26} alt='logo' />
          <h2 className='text'>EvntBoard</h2>
        </div>
        <Link to='/' className={cx('item', { active: activeItem === 'home' })}>
          <Icon icon='home' /> <span className='text'><MessageIntl message={MESSAGE.MENU_HOME} /></span>
        </Link>
        <Link to='/board' className={cx('item', { active: activeItem === 'board' })}>
          <Icon icon='heat-grid' /> <span className='text'><MessageIntl message={MESSAGE.MENU_BOARD} /></span>
        </Link>
        <Link to='/trigger' className={cx('item', { active: activeItem === 'trigger' })}>
          <Icon icon='cell-tower' /> <span className='text'><MessageIntl message={MESSAGE.MENU_TRIGGER} /></span>
        </Link>
      </div>
      <div className='down'>
        <Link to='/config' className={cx('item', { active: activeItem === 'config' })}>
          <Icon icon='cog' /> <span className='text'><MessageIntl message={MESSAGE.MENU_CONFIG} /></span>
        </Link>
        <div className='item bottom' onClick={onClick}>
          { open ? <Icon icon='chevron-left' /> : <Icon icon='chevron-right' /> }
        </div>
      </div>
    </div>
  )
}

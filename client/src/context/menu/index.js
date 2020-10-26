import React, {useContext, useEffect, useState} from "react";

import {menuSet, menuGet} from '../../service/menuService'

export const MenuContext = React.createContext(undefined)
export const useMenuContext = () => useContext(MenuContext)

export const MenuProvider = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState()

  useEffect(() => {
    menuGet().then((menu) => {
      setCurrentMenu(menu)
    })
  }, [])

  const setMenuOverride = (menu) => {
    menuSet(menu).then((newMenu) => {
      setCurrentMenu(newMenu)
    })
  }

  return (
    <MenuContext.Provider value={{
      menu: currentMenu,
      setMenu: setMenuOverride
    }}>
      {children}
    </MenuContext.Provider>
  )
}

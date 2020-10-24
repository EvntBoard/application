import React, {useEffect, useState} from "react";
import LangSelector from "../../components/LangSelector";
import {themeGet, themeSet} from "../../services/ThemeService";
import {ITheme} from "../../shared/types";

export default () => {
  const [theme, setTheme] = useState<ITheme>()

  useEffect(() => {
    themeGet().then((newTheme) => {
      setTheme(newTheme)
    })
  }, [])

  const onThemeChange = (e: any) => {
    const newTheme = parseInt(e.target.value, 10)
    themeSet(newTheme as ITheme).then((newTheme) => {
      setTheme(newTheme)
    })
  }

  return (
    <div>
      <div>
        <h3>Theme</h3>
        <select onChange={onThemeChange} value={theme} >
          <option value={ITheme.LIGHT}>Light</option>
          <option value={ITheme.DARK}>Dark</option>
        </select>
      </div>
      <div>
        <h3>Lang</h3>
        <LangSelector />
      </div>
      <div>
        <h3>Workspace</h3>
      </div>
      <div>
        <h3>App config</h3>
        <p>Host</p>
        <p>Port</p>
        <p>Password</p>
      </div>
    </div>
  )
}

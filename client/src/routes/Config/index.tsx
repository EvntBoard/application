import React, { useState } from 'react'
import { Tab, Tabs } from "@blueprintjs/core";

import App from './App'

import './assets/style.scss'
import MessageIntl from "../../components/MessageIntl";
import MESSAGE from "../../lang/langMessage";

export default () => {
  const [active, setActive] = useState<string>("app")

  const handleTabChange = (newActive: any) => {
    setActive(newActive)
  }

  return (
    <div className='app-content config'>
      <Tabs renderActiveTabPanelOnly onChange={handleTabChange} selectedTabId={active}>
        <Tab id="app" title={<MessageIntl message={MESSAGE.MENU_CONFIG_APP} />} panel={<App />} />
        <Tab id="module" title={<MessageIntl message={MESSAGE.MENU_CONFIG_MODULE} />} panel={<div>Module</div>} />
      </Tabs>
    </div>
  )
}

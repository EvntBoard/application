import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

// load default locale
import 'intl/locale-data/jsonp/en.js'
import 'intl/locale-data/jsonp/fr.js'

import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './style.scss'

// theme init wtf ?!
window.app.config.get('dark')

ReactDOM.render(<Root />, document.getElementById('root'))

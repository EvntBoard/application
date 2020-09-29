import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

import 'normalize.css/normalize.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './style.scss'

ReactDOM.render(<Root />, document.getElementById('root'))

import React, {useEffect} from 'react'
import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { selectors as boardSelectors } from '../../store/board'
import { selectors as btnSelectors } from '../../store/button'
import { selectors as wsSelectors } from '../../store/websocket'
import { selectors as themeSelectors } from '../../store/theme'
import { selectors as langSelectors } from '../../store/lang'

const App = () => {
  const loadingButtons = useSelector(btnSelectors.loading)
  const loadingBoards = useSelector(boardSelectors.loading)
  const loadingTheme = useSelector(themeSelectors.loading)
  const loadingLang = useSelector(langSelectors.loading)
  const connectedWS = useSelector(wsSelectors.connected)

  useEffect(() => {
    if (loadingButtons && loadingBoards && loadingTheme && loadingLang && connectedWS) {
      console.log('OK')
    }
  }, [loadingButtons, loadingBoards, loadingTheme, loadingLang, connectedWS])

  return (
    <Container className="App">
      Loading ...
    </Container>
  );
}

export default App;

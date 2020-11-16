import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container } from '@material-ui/core'

import { boardFindAll, selectors as boardSelectors } from '../../store/board'
import { buttonFindAll, selectors as btnSelectors } from '../../store/button'
import { wsConnect, selectors as wsSelectors } from '../../store/websocket'
import { themeGet, selectors as themeSelectors } from '../../store/theme'
import { langGet, selectors as langSelectors } from '../../store/lang'
import { cacheGet } from '../../store/cache'

const App = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const loadingButtons = useSelector(btnSelectors.loading)
  const loadingBoards = useSelector(boardSelectors.loading)
  const loadingTheme = useSelector(themeSelectors.loading)
  const loadingLang = useSelector(langSelectors.loading)
  const connectedWS = useSelector(wsSelectors.connected)
  const idWS = useSelector(wsSelectors.id)

  useEffect(() => {
    dispatch(langGet())
    dispatch(themeGet())
    dispatch(cacheGet())
    dispatch(buttonFindAll())
    dispatch(boardFindAll())
    dispatch(wsConnect())
  }, [dispatch])

  useEffect(() => {
    if (!loadingButtons && !loadingBoards && !loadingTheme && !loadingLang && connectedWS && !!idWS) {
      navigate('/board')
    }
  }, [loadingButtons, loadingBoards, loadingTheme, loadingLang, connectedWS, idWS, navigate])

  return (
    <Container className="App">
      Loading ...
    </Container>
  );
}

export default App;

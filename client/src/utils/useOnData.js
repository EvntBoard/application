import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { webServerOnClose, webServerOnError, webServerOnOpen } from '../service/webServerService'
import {
  eventHistoryOnEnd as eventHistoryOnEndService,
  eventHistoryOnError as eventHistoryOnErrorService,
  eventHistoryOnNew as eventHistoryOnNewService,
  eventHistoryOnStart as eventHistoryOnStartService,
} from '../service/eventHistoryService'
import { workspaceOnChange } from '../service/workspaceService'
import { webserverOnOpen, webserverOnClose, webserverOnError } from '../store/webserver'
import { workspaceOnChange as actionWorkspaceOnChange } from '../store/workspace'
import { eventHistoryProcessOnStart, eventHistoryOnNew, eventHistoryProcessOnError, eventHistoryProcessOnEnd } from '../store/eventHistory'
import { sessionOnChange as actionSessionOnChange } from '../store/session'
import { cacheOnChange as actionCacheOnChange } from '../store/cache'
import { onMediaPlay } from '../service/mediaService'
import { sessionOnChange } from '../service/sessionService'
import { cacheOnChange } from '../service/cacheService'

const useOnData = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    webServerOnOpen(() => {
      dispatch(webserverOnOpen())
    })
    webServerOnClose(() => {
      dispatch(webserverOnClose())
    })
    webServerOnError((event, error) => {
      dispatch(webserverOnError(error))
    })
    workspaceOnChange(() => {
      dispatch(actionWorkspaceOnChange())
    })

    eventHistoryOnNewService((event, data) => {
      dispatch(eventHistoryOnNew(data))
    })
    eventHistoryOnStartService((event, data) => {
      dispatch(eventHistoryProcessOnStart(data))
    })
    eventHistoryOnEndService((event, data) => {
      dispatch(eventHistoryProcessOnEnd(data))
    })
    eventHistoryOnErrorService((event, data) => {
      dispatch(eventHistoryProcessOnError(data))
    })

    sessionOnChange((event, data) => {
      dispatch(actionSessionOnChange(data))
    })

    cacheOnChange((event, data) => {
      dispatch(actionCacheOnChange(data))
    })

    onMediaPlay()
  }, [dispatch])
}
export default useOnData

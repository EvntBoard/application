import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { webServerOnClose, webServerOnError, webServerOnOpen } from '../service/webServerService'
import { webserverOnOpen, webserverOnClose, webserverOnError } from '../store/webserver'

const useOnData = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    webServerOnOpen(() => {
      dispatch(webserverOnOpen())
    })
    webServerOnClose(() => {
      dispatch(webserverOnClose())
    })
    webServerOnError((evt, error) => {
      dispatch(webserverOnError(error))
    })
  }, [])
}
export default useOnData

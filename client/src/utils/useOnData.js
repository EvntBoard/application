import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { webServerOnClose, webServerOnError, webServerOnOpen } from '../service/webServerService'
import { onClose, onError, onOpen } from '../store/feature/webserver'

const useOnData = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    webServerOnOpen(() => {
      dispatch(onOpen())
    })
    webServerOnClose(() => {
      dispatch(onClose())
    })
    webServerOnError((evt, ...rest) => {
      dispatch(onError(rest))
    })
  }, [])
}
export default useOnData

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { webServerOnClose, webServerOnError, webServerOnOpen } from '../service/webServerService'

const useOnData = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    webServerOnOpen(() => {
      // dispatch(onOpen())
    })
    webServerOnClose(() => {
      // dispatch(onClose())
    })
    webServerOnError((evt, ...rest) => {
      // dispatch(onError(rest))
    })
  }, [])
}
export default useOnData

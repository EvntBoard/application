import React, { useContext, useReducer, useCallback } from 'react'
import { noop } from 'lodash'
import fetchReducer from './reducer'

const INITIAL_FETCH_STATE = {
  hasBeenFetchedOnce: false,
  loading: false,
  success: false,
  failed: false,
  error: {},
  result: null
}

export const AppContext = React.createContext(INITIAL_FETCH_STATE)
export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [{
    loading,
    success,
    failed,
    error,
    result
  }, dispatch] = useReducer(fetchReducer, INITIAL_FETCH_STATE, noop)

  const onLoading = useCallback(() => {
    dispatch({type: LOADING})
  }, [])
  const onSuccess = useCallback((value) => {
    dispatch({type: SUCCESS, payload: value})
  }, [])
  const onFailed = useCallback((value) => {
    dispatch({type: FAILED, payload: value})
  }, [])
  const onReset = useCallback((value) => {
    dispatch({type: RESET, payload: value})
  }, [])

  return (
    <AppContext.Provider value={}>
      {children}
    </AppContext.Provider>
  )
    // onReset,
    // loading,
    // onLoading,
    // success,
    // onSuccess,
    // failed,
    // onFailed,
    // error,
    // result

}

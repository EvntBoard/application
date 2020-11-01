const fetchReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        loading: true,
        success: false,
        failed: false,
        error: {}
      }
    case SUCCESS:
      return {
        hasBeenFetchedOnce: true,
        loading: false,
        success: true,
        failed: false,
        error: {},
        result: action.payload
      }
    case FAILED:
      return {
        hasBeenFetchedOnce: true,
        loading: false,
        success: false,
        failed: true,
        error: action.payload
      }
    case RESET:
      return {
        ...INITIAL_FETCH_STATE
      }
    default:
      return state
  }
}

export default fetchReducer

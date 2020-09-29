import { getModel, setModel } from './database'

const CONFIG = { default: false, path: 'obs' }

export const get = () => {
  return getModel({ ...CONFIG, path: `${CONFIG.path}` })
}

export const set = (value) => {
  return setModel(value, { ...CONFIG, path: `${CONFIG.path}` })
}

export default {
  get,
  set
}

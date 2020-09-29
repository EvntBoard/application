import { getModel, setModel } from './database'

const CONFIG = { default: false, path: 'config' }

export const get = (key) => {
  return getModel({ ...CONFIG, path: `${CONFIG.path}.${key}` })
}

export const set = (key, value) => {
  return setModel(value, { ...CONFIG, path: `${CONFIG.path}.${key}` })
}

export default {
  get,
  set
}

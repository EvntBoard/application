import { set, get } from './'

import { broadcast } from '../socketIo'

const change = (id, key, value) => {
  const buttonCache = get(`button-${id}`)
  let newData
  if (buttonCache) {
    newData = { ...buttonCache, [key]: value }
  } else {
    newData = { [key]: value }
  }
  return newData
}

export const color = async (id, color) => {
  let newData = change(id, 'color', color)
  set(`button-${id}`, newData)
  broadcast('sync', { [`button-${id}`]: newData })
}

export const text = async (id, text) => {
  let newData = change(id, 'text', text)
  set(`button-${id}`, newData)
  broadcast('sync', { [`button-${id}`]: newData })
}

export const image = async (id, image) => {
    let newData = change(id, 'image', image)
  set(`button-${id}`, newData)
  broadcast('sync', { [`button-${id}`]: newData })
}

export const cacheGet = async (cache) => {
  return await window.app.cache.get(cache)
}

export const cacheOnChange = (callback) => {
  window.app.cache.onChange(callback)
}


import { find, filter, cloneDeep } from 'lodash';

import { broadcast } from './WebServerService';
import { mainWindowsSend } from './MainWindowService';
import { CACHE } from '../preload/ipc';
import { ICache } from '../otherTypes';

let cache: ICache = null;

export const init = () => {
  cache = {
    boards: [],
    buttons: [],
  };
};

export const getCache = () => {
  return cloneDeep(cache);
};

const changeCacheValue = (
  type: 'boards' | 'buttons',
  id: string,
  key: string,
  value: any
): ICache => {
  let newCache: ICache = cloneDeep(cache);

  if (!type || !newCache || !(type in newCache)) {
    return
  }

  // @ts-ignore
  let newType: object = find(newCache[type], { id });

  if (typeof newType === 'object') {
    newType = {
      ...newType,
      [key]: value,
    };
  } else {
    newType = { id, [key]: value };
  }

  // @ts-ignore
  newCache[type] = [...filter(newCache[type], (i) => i.id !== id), newType];

  cache = newCache;

  broadcast('cacheUpdate', newCache);
  mainWindowsSend(CACHE.ON_CHANGE, newCache);

  return cache;
};

// BOARDS

export const changeBoardColor = async (id: string, color: string): Promise<ICache> => {
  return changeCacheValue('boards', id, 'color', color);
};

export const changeBoardImage = async (id: string, image: string): Promise<ICache> => {
  return changeCacheValue('boards', id, 'image', image);
};

// BUTTONS

export const changeButtonText = async (id: string, text: string): Promise<Partial<ICache>> => {
  return changeCacheValue('buttons', id, 'text', text);
};

export const changeButtonColor = async (id: string, color: string): Promise<Partial<ICache>> => {
  return changeCacheValue('buttons', id, 'color', color);
};

export const changeButtonImage = async (id: string, image: string): Promise<Partial<ICache>> => {
  return changeCacheValue('buttons', id, 'image', image);
};

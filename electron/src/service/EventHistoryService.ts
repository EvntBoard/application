import { sortBy, find, filter, reverse } from 'lodash';

let history: Array<any>;

export const init = () => {
  history = [];
};

export const getHistory = () => {
  return reverse(sortBy(history, [(o: any) => o?.meta?.newDate]));
};

export const historyPush = (event: any) => {
  const storedEvent = find(history, (e) => e?.meta?.uniqueId === event?.meta?.uniqueId);
  if (storedEvent) {
    history = [
      ...filter(history, (e) => e?.meta?.uniqueId),
      {
        ...storedEvent,
        ...event,
      },
    ];
  } else {
    history.push(event);
  }
};

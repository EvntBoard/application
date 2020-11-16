import { boardGetDefault } from './BoardService';
import { broadcastToClient } from './WebServerService';
import { mainWindowsSend } from './MainWindowService';
import { SESSION } from '../preload/ipc';

let sessions: Map<string, string>;

export const init = () => {
  sessions = new Map<string, string>();
  newSession('ipc');
};

export const newSession = (session: string) => {
  const defaultBoard = boardGetDefault();
  if (session && defaultBoard) {
    setSession(defaultBoard.id, session);
  }
};

export const getSession = (session: string = 'ipc') => {
 if (sessions) {
   return sessions.get(session);
 }
 return null
};

export const setSession = (value: string, session: string = 'ipc') => {
  if (sessions) {
    sessions.set(session, value);
    if (session === 'ipc') {
      mainWindowsSend(SESSION.ON_CHANGE, value);
    } else {
      broadcastToClient(session, 'sessionUpdate', value);
    }
  }
};

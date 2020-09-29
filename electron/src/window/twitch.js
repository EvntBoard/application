import { parse } from 'query-string'
import { BrowserWindow } from 'electron'
import logger from '../logger'
import { mainWindow } from './main'

export const TWITCH_CLIENT_ID = 'v554keq1h8ie1ae55ewm6ew1c0c899'
export const TWITCH_CLIENT_URL = 'http://foo.bar/login'
export const TWITCH_CLIENT_SCOPE = ["chat:read", "channel:moderate", "chat:edit", "channel_commercial", "channel_editor", "whispers:edit"]

export const TWITCH_AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_CLIENT_URL}&response_type=token&scope=${TWITCH_CLIENT_SCOPE.join('+')}&force_verify=true`

export default () => new Promise((resolve, reject) => {
  logger.debug('Load window : Twitch')

  let done = false;
  const authWindow = new BrowserWindow({
    width: 600,
    height: 500,
    // show: false,
    modal: true,
    parent: mainWindow
  });

  authWindow.setMenu(null)

  authWindow.webContents.once('did-finish-load', () => authWindow.show());

  authWindow.on('closed', () => {
    if (!done) {
      reject();
    }
  });

  authWindow.webContents.on('before-input-event', (_, input) => {
    switch (input.key) {
      case 'Esc':
      case 'Escape':
        authWindow.close()
        break;

      default:
        break;
    }
  })

  authWindow.webContents.session.webRequest.onBeforeRequest(
    { urls: [TWITCH_CLIENT_URL] },
    (details, callback) => {
      const url = new URL(details.url);
      const match = url.origin + url.pathname;

      // sometimes, electron seems to intercept too much... we catch this here
      if (match !== TWITCH_CLIENT_URL) {
        // the trailing slash might be too much in the pathname
        if (url.pathname !== '/' || url.origin !== TWITCH_CLIENT_URL) {
          callback({});
          return;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params = url.hash ? parse(url.hash.substr(1)) : url.searchParams;

      if (params.error || params.access_token) {
        done = true;
        authWindow.destroy();
      }

      if (params.error) {
        reject(new Error(`Error received from Twitch: ${params.error}`));
      } else if (params.access_token) {
        resolve(params);
      }

      callback({ cancel: true });
    }
  );

  // do this last so there is no race condition
  authWindow.loadURL(TWITCH_AUTH_URL);
})

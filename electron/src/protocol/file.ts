import * as path from 'path';
import * as electronIsDev from 'electron-is-dev';

export const config = {
  scheme: 'file',
  privileges: {
    secure: true,
    standard: true,
  },
};

// TODO PATH
export const requestHandler = (request: { url: string; }, callback: (arg0: { path: string; }) => void) => {
  const url = request.url.substr(7); /* all urls start with 'file://' */

  let newPath;
  if (electronIsDev) {
    newPath = path.join(process.cwd(), 'build', 'client', url);
  } else {
    newPath = path.join(__dirname, 'client', url);
  }

  callback({ path: newPath });
};

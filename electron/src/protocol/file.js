import path from 'path'
import electronIsDev from 'electron-is-dev'

export const config = {
  scheme: 'file',
  privileges: {
    secure: true,
    standard: true
  }
}

// TODO PATH
export const requestHandler = (request, callback) => {
  const url = request.url.substr(7)    /* all urls start with 'file://' */

  let newPath
  if (electronIsDev) {
    newPath = path.join(process.cwd(), 'build', 'client', url)
  } else {
    newPath = path.join(__dirname, 'client', url)
  }

  callback({ path: newPath })
}

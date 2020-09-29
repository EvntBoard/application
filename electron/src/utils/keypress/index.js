import { spawnSync } from "child_process"
import darwin from './platform/darwin'
import win32 from './platform/win32'
import linux from './platform/linux'

let config
switch (process.platform) {
  case 'darwin':
    config = darwin
    break
  case 'win32':
    config = win32
    break
  case 'linux':
    config = linux
    break
  default:
    throw new Error('Unknown platform: ' + process.platform)
}

function cmd(args) {
  const app = args[0]
  args = args.slice(1)
  const {stdout, stderr, status} = spawnSync(app, args)
  if (status !== 0) throw stderr
  return stdout
}
function cmd2(args2) {
  for (let i in args2) {
    let args = args2[i]
    const app = args[0]
    args = args.slice(1)
    // console.log(app, args)
    const {stderr, status} = spawnSync(app, args)
    if (status !== 0) {
      if (process.platform === 'linux') {
        console.warn('** Linux needs `xdotool`')
      }
      throw stderr
    }
  }
}

export function send(keys, metaKeys) {
  cmd(config.send(keys, metaKeys))
}

export function activate(title) {
  cmd(config.activate(title))
}

export function run(path) {
  return cmd(config.run(path))
}

export function sleep(v) {
  cmd(config.sleep(v))
}

export function sendKeys(keys) {
  cmd2(config.sendKeys(keys))
}

export default {
  sendKeys,
  send,
  sleep,
  run,
  activate
}

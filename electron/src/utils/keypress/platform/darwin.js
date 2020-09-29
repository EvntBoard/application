// memo) https://apple.stackexchange.com/questions/36943/how-do-i-automate-a-key-press-in-applescript
// memo) http://sengyoaruji.iinaa.net/20160603a.html
// memo) https://eastmanreference.com/complete-list-of-applescript-key-codes
//
const spkeys = {
  'return': 'keystroke Return',
  'enter': 'keystroke Return',
  'tab': 'keystroke Tab',
  'home': 'keystroke Home',
  'end': 'key code 119',
  'pageup': 'key code 116',
  'pagedwon': 'key code 121',
  'space': 'keystroke Space',
  'spc': 'keystroke Space',
  'delete': 'key code 51',
  'bs': 'key code 51',
  'esc': 'key code 53',
  'escape': 'key code 53',
  'up': 'key code 126',
  'right': 'key code 124',
  'down': 'key code 125',
  'left': 'key code 123',
  'f1': 'key code 122',
  'f2': 'key code 120',
  'f3': 'key code 99',
  'f4': 'key code 118',
  'f5': 'key code 96',
  'f6': 'key code 97',
  'f7': 'key code 98',
  'f8': 'key code 100',
  'f9': 'key code 101',
  'f10': 'key code 109',
  'f11': 'key code 103',
  'f12': 'key code 111',
  'f13': 'key code 105',
  'f14': 'key code 107',
  'f15': 'key code 113',
  'f16': 'key code 106',
  'f17': 'key code 64',
  'f18': 'key code 79',
  'f19': 'key code 80',
  'f20': 'key code 90',
  'fn': 'key code 63',
  '*': 'key code 67',
  '/': 'key code 75',
  '+': 'key code 69',
  '-': 'key code 78',
  '=': 'key code 81',
  '.': 'key code 65',
  'clear': 'key code 71'
}
const metaChars = {'+': 'shift', '^': 'control', '%': 'alt', '&': 'command'}

function send(key, metaKeys) {
  key = key.toLowerCase()
  let action = `keystroke ${key}`
  if (spkeys[key]) action = spkeys[key]
  // same time press
  let opt = ''
  if (metaKeys !== undefined && metaKeys.length > 0) {
    const a = []
    for (let i in metaKeys) {
      a.push(metaKeys[i] + ' down')
    }
    opt = ' using {' + a.join(',') + '}'
  }

  const cmd = ['osascript', '-e']
  cmd.push(`tell application "System Events" to ${action}` + opt)
  return cmd
}

function sendKeys(keys) {
  const result = []
  let str = keys
  let metaKeys = []
  while (str.length > 0) {
    const c = str.substr(0, 1)
    // 同時押しキー
    if (metaChars[c]) {
      metaKeys.push(metaChars[c])
      str = str.substr(1)
      continue
    }
    // 特殊キーを送る
    if (c === '{') {
      const endPos = str.indexOf('}')
      if (endPos < 0) break
      let key = str.substr(1, endPos - 1)
      if (metaChars[key]) {
        result.push(send('"'+key+'"'))
      } else {
        result.push(send(key, metaKeys))
      }
      str = str.substr(endPos + 1)
      metaKeys = []
      continue
    }
    // 一文字送る
    result.push(send(`"${c}"`, metaKeys))
    metaKeys = []
    str = str.substr(1)
  }
  return result
}

// send (raw)
module.exports.send = send
module.exports.sendKeys = sendKeys

// ative
module.exports.activate = function (title) {
  const cmd = ['osascript', '-e']
  cmd.push(`tell application "${title}" to activate`)
  return cmd
}

// run
module.exports.run = function (path) {
  return ['open', path]
}

// sleep
module.exports.sleep = function (v) {
  return ['sleep', v]
}

// getActive ... security error
module.exports.getActive = function () {
  const cmd = ['osascript', '-e']
  cmd.push(`
global frontApp, frontAppName, windowTitle
set windowTitle to ""
tell application "System Events"
	set frontApp to first application process whose frontmost is true
	set frontAppName to name of frontApp
	tell process frontAppName
		tell (1st window whose value of attribute "AXMain" is true)
			set windowTitle to value of attribute "AXTitle"
		end tell
	end tell
end tell
return {windowTitle, frontAppName}
`)
  return cmd
}

// Linux need xdotool

const metaChars = {'+': 'shift', '^': 'ctrl', '%': 'alt', '&': 'command'}
const spkeys = {
  'enter': 'XK_Return',
  'return': 'XK_Return',
  'tab': 'XK_Tab',
  'space': 'XK_KP_Space',
  'spc': 'XK_KP_Space',
  'suppr': 'XK_Delete',
  '+': 'plus',
  '-': 'minus',
  '*': 'asterisk',
  '/': 'slash',
  '\\': 'backslash',
  ' ': 'Space',
  '"': 'quotedbl',
  '$': 'dollar',
  '%': 'percent',
  '&': 'ampersand',
  '`': 'quoteright',
  '(': 'parenleft',
  ')': 'parenright',
  '[': 'bracketleft',
  ']': 'bracketright',
  ',': 'comma',
  '_': 'underscore',
  '\'': 'quoteleft',
  ':': 'colon',
  ';': 'semicolon',
  '<': 'less',
  '>': 'greater',
  '=': 'equal',
  '?': 'question',
  '@': 'at',
  '{': 'braceleft',
  '}': 'braceright',
  '~': 'asciitilde',
  'f1': 'F1',
  'f2': 'F2',
  'f3': 'F3',
  'f4': 'F4',
  'f5': 'F5',
  'f6': 'F6',
  'f7': 'F7',
  'f8': 'F8',
  'f9': 'F9',
  'f10': 'F10',
  'f11': 'F11',
  'f12': 'F12',
  'f13': 'F13',
  'f14': 'F14',
  'f15': 'F15',
  'f16': 'F16',
  'f17': 'F17',
  'f18': 'F18',
  'f19': 'F19',
  'f20': 'F20',
  'bs': 'BackSpace',
  'backspace': 'BackSpace',
  'up': 'Up',
  'right': 'Right',
  'down': 'Down',
  'left': 'Left'
}
const metaKeyMapping = {
  'ctrl': 'Control_L',
  'alt': 'Alt_L',
  'super': 'Super_L',
  'meta': 'Meta_L',
  'shift': 'Shift_L'
}

function send(key, metaKeys) {
  if (spkeys[key.toLowerCase()]) key = spkeys[key]
  // same time press
  let opt = ''
  if (metaKeys !== undefined && metaKeys.length > 0) {
    const a = []
    for (let i in metaKeys) {
      const metaVal = metaKeyMapping[metaKeys[i]] || metaKeys[i]
      a.push(metaVal)
    }
    opt = a.join('+')
  }

  const cmd = ['xdotool', 'key', opt + '+' + key]
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
        result.push(send(key))
      } else {
        result.push(send(key, metaKeys))
      }
      str = str.substr(endPos + 1)
      metaKeys = []
      continue
    }
    // 一文字送る
    result.push(send(c, metaKeys))
    metaKeys = []
    str = str.substr(1)
  }
  return result
}

// send (raw)
module.exports.send = send
module.exports.sendKeys = sendKeys


// ative command
module.exports.activate= function (title) {
  const cmd = ['xdotool', 'windowactivate', title]
  return cmd
}

module.exports.getActive = function () {
  const cmd = ['xdotool', 'wgetactivewindow']
  return cmd
}

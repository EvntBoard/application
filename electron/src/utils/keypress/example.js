const sendkeys = require('../index.js')
if (process.platform === 'darwin') {
  sendkeys.sendKeys('ls{enter}')
  /*
  sendkeys.activate('CotEditor')
  sendkeys.send('"a"',['command'])
  sendkeys.send('T')

  sendkeys.send('"This"')
  sendkeys.send('space')
  sendkeys.send('"is"')
  sendkeys.send('space')
  sendkeys.send('"Mike."')
  */
  /*
  sendkeys.sendKeys('+^q')
  sendkeys.sleep(1)
  sendkeys.sendKeys('Calculator.app{enter}')
  sendkeys.sleep(1)
  sendkeys.activate('Calculator')
  sendkeys.sendKeys('c1{+}2*3{enter}')
  */
}
if (process.platform == 'win32') {
  sendkeys.run('calc')
  sendkeys.sleep(2)
  sendkeys.activate('Calcurator')
  sendkeys.sendKeys('1{+}2{+}3{enter}')
}
if (process.platform == 'linux') {
  // sendkeys.sendKeys('ls{tab}{tab}')
  sendkeys.sendKeys('ls{enter}')
  sendkeys.sendKeys('Hello{left}{left}')
}

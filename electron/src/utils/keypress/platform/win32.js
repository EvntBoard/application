// send
module.exports.send = function (keys, metaKeys) {
  const cmd = ['powershell', '-command']
  cmd.push(`
$wshell = New-Object -ComObject wscript.shell;
$wshell.SendKeys("${keys}");
  `)
  return cmd
}

// sendKeys
module.exports.sendKeys = function (keys) {
  return [module.exports.send(keys)]
}

// ative command
module.exports.activate = function (title) {
  const cmd = ['powershell', '-command']
  cmd.push(`
$wshell = New-Object -ComObject wscript.shell;
$wshell.AppActivate("${title}");
  `)
  return cmd
}

// run
module.exports.run = function (path) {
  const cmd = ['powershell', '-command']
  cmd.push(`
$wshell = New-Object -ComObject wscript.shell;
$wshell.run("${path}");
  `)
  return cmd
}

// sleep
module.exports.sleep = function (v) {
  const cmd = ['powershell', '-command']
  cmd.push(`Start-Sleep -s ${v}`)
  return cmd
}



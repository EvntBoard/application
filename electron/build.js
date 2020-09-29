const shell = require('shelljs')

// Copy files to release dir
shell.rm('-rf', 'dist')
shell.rm('-rf', 'build')

shell.cd('../client')
shell.rm('-rf', 'node_modules')
shell.exec('yarn install')
shell.exec('yarn build')

shell.cd('../web')
shell.rm('-rf', 'node_modules')
shell.exec('yarn install')
shell.exec('yarn build')

shell.cd('../electron')
shell.exec('yarn install')
shell.exec('yarn build')

shell.cp('-R', '../client/build', './build/client')
shell.cp('-R', '../web/build', './build/web')

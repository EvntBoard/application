const shell = require('shelljs')

shell.rm('-rf', 'dist')
shell.rm('-rf', 'build')
shell.rm('-rf', 'lib')

shell.cd('../client')
shell.rm('-rf', 'node_modules')
shell.exec('yarn install')
shell.exec('yarn build')

shell.cd('../web')
shell.rm('-rf', 'node_modules')
shell.exec('yarn install')
shell.exec('yarn build')

shell.cd('../evntboard-jar')
shell.exec('mvn clean package')

shell.cd('../electron')
shell.exec('yarn install')
shell.exec('yarn build')

shell.cp('-R', '../client/build', './build/client')
shell.cp('-R', '../web/build', './build/web')
shell.cp('../evntboard-jar/target/*.jar', './lib/keyboard.jar')

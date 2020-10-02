const shell = require('shelljs')

shell.rm('-rf', 'lib')

shell.cd('../evntboard-jar')
shell.exec('mvnw clean package')

shell.cd('../electron')
shell.exec('mkdir lib')

shell.cp('../evntboard-jar/target/*.jar', './lib/keyboard.jar')

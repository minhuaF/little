// TODO 不仅cli需要check-version，单独的项目在执行start命令时也是需要check-version
const superagent = require('superagent')
const semver = require('semver') // 语义化版本
const chalk = require('chalk')
const inquirer = require('inquirer')
const packageConfig = require('../package.json')
const PROJECT = require('../project.config')

module.exports = function (done) {
  superagent
    .get(PROJECT.registryURl)
    .end(function (err, res) {
      if (err) {
        console.log('fail to check little version, please check your network')
        return
      }
      if (!err && res.status == 200) {
        const latestVersion = res.body['dist-tags'].latest
        const localVersion = packageConfig.version
        if (semver.lt(localVersion, latestVersion)) {
          console.log()
          console.log(chalk.yellow(' A newer version of little-cli is available.'))
          console.log()
          console.log(' lastest:    ' + chalk.yellow(latestVersion))
          console.log(' installed:  ' + chalk.red(localVersion))
          console.log()
          isUpdateVersion(done)
        }
      }
    })
}

/**
 * 更新cli版本
 */
function isUpdateVersion(done) {
  inquirer.prompt([{
    type: 'confirm',
    message: 'Is update the cli?',
    name: 'ok'
  }]).then(answers => {
    if (answers.ok) {
      console.log()
      console.log(` Please run ${chalk.red('npm install little-cli -g')} to update !`)
    } else {
      console.log()
      console.log(chalk.red(' You choose not to update the cli. I guess you should update it !'))
      console.log()
      done()
    }
  })
}

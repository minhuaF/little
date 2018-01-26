// TODO 不仅cli需要check-version，单独的项目在执行start命令时也是需要check-version
const superagent = request('superagent')
const semver = require('semver') // 语义化版本
const chalk = require('chalk')
const packageConfig = require('../package.json')

const CLIREPOSITY= ''// cli 地址

superagent
  .get(CLIREPOSITY)
  .end( function(err, res) {
    if(err) {
      console.log('fail to check little version, please check your network')
      return
    }
    if(!err && res.status == 200) {
      const latestVersion = JSON.parse(res.body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if(semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow(' A newer version of little-cli is available.'))
        console.log()
        console.log(' lastest:    ' + chalk.yellow(latestVersion))
        console.log(' installed:  ' + chalk.red(localVersion))
        console.log()
        // TODO 把与上一个版本的更新内容输出
        const diffDescrip = JSON.parse(res.body)['UPDATELOG']
        console.log(chalk.green(diffDescrip))
      }
    }
  })
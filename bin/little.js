#!/usr/bin/env node

'use strict'

process.title = 'little'

const exists = require('fs').existsSync
const download = require('download-git-repo')
const path = require('path')
const program = require('commander') // 简化命令行开发
const ora = require('ora')
const chalk = require('chalk')
const checkVersion = require('../lib/check-version')
const pkg = require(path.join(__dirname, '../package.json'))
const PROJECT = require('../project.config')

program
  .version(pkg.version) // 用于设置命令程序的版本号
  .description('A test cli program of my career')  // 用于设置命令的描述
  .usage('<command> [project-name]')

program
  .command('init') // 定义命令，action是命令的回调
  .description('generate a new project from a template')
  .action(function (projectName) { // 用于设置命令执行的相关回调，fn可以接收命令的参数为函数形参，顺序与command()中定义的顺序一致
    checkVersion(downloadAndGenerate(PROJECT.registryName, projectName))
  })

program.on('--help', function () {
  console.log(' Examples: ')
  console.log()
  console.log('    # create a new project with an official template')
  console.log('    $ little init my-project')
  console.log()
  console.log(chalk.yellow('if you still can not, please connect me by 15692017496'))
})

start()

/**
 * 开始
 */
function start() {
  program.parse(process.argv) //一般最后调用，用于解析process.argv ;process是node在执行中在内存中存在的一个全局变量,意为进程对象
  if (!process.argv.slice(2).length) {
    return program.help()
  }
}

/**
 * 从模板仓库下载模板
 * 
 * @param {String} template - 使用的模板
 * @param {String} projectName - 新建的文件名
 */
function downloadAndGenerate(template, projectName) {
  // 启动控制台loading
  var spinner = ora('downloading template')
  spinner.start()

  download(template, projectName, function (err, done) {
    spinner.stop();
    if (err) {
      console.error(err)
      return
    }
    console.log('Generated ' + chalk.green(projectName) + ' success !')
  })
}
#!/usr/bin/env node

'use strict'

process.title = 'little'

const exists = require('fs').existsSync
const download = require('download-git-repo')
const path = require('path')
const program = require('commander') // 简化命令行开发
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')

const checkVersion = require('../lib/check-version')

const PROJECT = require('../project.config')

// TODO 为什么控制台文字颜色会变？？？
const templateInfo = Object.keys(PROJECT.template)
for (let i = 0; i < templateInfo.length; i++) {
  const tempName = templateInfo[i]
  const url = PROJECT.template[tempName]
  if (process.argv.slice(2) && tempName == process.argv.slice(2)[0]) {
    program
      .command(tempName)
      .usage(`<template-name> [project-name]`)
      .description(`generate a new project from the ${tempName} template (${url})`)
      .action(function (projectName) { // 用于设置命令执行的相关回调，fn可以接收命令的参数为函数形参，顺序与command()中定义的顺序一致
        // TODO 这里编码的方式只能通过回调？是否有更好的方法
        checkVersion(function () {
          isRename(projectName, function () {
            downloadAndGenerate(url, projectName)
          })
        })
      })
  }
}

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
 * 判断文件名是否已存在
 * @param projectName --文件夹名字
 */
function isRename(projectName, done) {
  if (exists(projectName)) {
    inquirer.prompt([{
      type: 'confirm',
      message: 'Target directory exists, Continue?',
      name: 'ok'
    }]).then(answers => {
      if (answers.ok) {
        done()
      }
    })
  } else {
    done()
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
  // console.log()
  var spinner = ora('downloading template')
  console.log()
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
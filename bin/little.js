#!/usr/bin/env node

require('commander')
  .version(require('../package').version) // 用于设置命令程序的版本号
  .usage('<command> [options]')
  .description('The cli program to generate a new project')  
  .command('init', 'generate a new project from a template')
  .parse(process.argv)

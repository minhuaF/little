## little-cli
> 通用的cli库，可以通过配置`project.config.js`文件，实现下载不一样的框架库

``` bash
$ npm install little -g
```

### Usage

先配置`project.config.js`中的`template`字段，`key`是命令模块，`value`是模板地址。

```javascript
module.exports = {
  registryURl: 'https://registry.npmjs.org/little-cli',
  template: {
    koa: 'minhuaF/koa-server',
    react: 'minhuaF/first-react-app'
  }
}
```

```bash
$ little init <template-name> <project-name>
```

Example: 

```bash
$ little init koa my-project
```


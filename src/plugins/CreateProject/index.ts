import fs from 'fs-extra'
import { Command } from 'commander'
import { CommandPlugin } from '../../interface/plugin'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'
import chalk from 'chalk'
import { gitClone } from '../../utils/git'
import shell from 'shelljs'
import { initReact } from './initReact'

const CreateProjectPrompts = [
  {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称:',
    validate: function (value: string) {
      if (!value) {
        return '请输入项目名称！'
      }
      if (value.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
        return '项目名称不合法！'
      }
      return true
    },
  },
  {
    type: 'list',
    name: 'type',
    message: '选择项目类型',
    choices: ['react-h5', 'react-admin', 'Vue H5', 'Vue Element Admin', 'NuxtJS PC', 'Koa', 'Express', 'js-lib'],
  },
]

/**
 * 创建项目插件
 */
export class CreateProjectPlugin implements CommandPlugin {
  addPlugin(program: Command) {
    program
      .command('init')
      .description('初始化项目')
      .action(async () => {
        const { projectName, type } = await inquirer.prompt(CreateProjectPrompts)

        // check git env
        if (!shell.which('git')) {
          shell.echo('git 未安装，请先安装 git')
          shell.exit(1)
        }

        // check fileName is exists
        if (fs.existsSync(projectName)) {
          console.log(logSymbols.warning, `已存在项目文件夹${projectName}!`)
          return
        }

        console.log('success', type)
        switch (type) {
          case 'react-h5':
            initReact({ projectName })
            break
        }

        // const initOptions = await inquirer.prompt(CreateProjectPrompts)
        // console.log('initOptions', initOptions)
        // await gitClone('master', 'git@github.com:fangmd/react-ts-template.git', 'a-temp2')
      })
  }
}

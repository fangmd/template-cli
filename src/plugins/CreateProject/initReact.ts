import Conf from './config'
import shell from 'shelljs'
import logSymbols from 'log-symbols'
import chalk from 'chalk'
import ora from 'ora'
import fs from 'fs-extra'
import { gitClone } from '../../utils/git'

export async function initReact({ projectName }) {
  console.log(`init h5: ${Conf.React}`)

  // 下载项目模版
  await gitClone('master', Conf.React, projectName)
  const pwd = shell.pwd()

  // 清理文件
  const deleteDir = ['.git', 'README.md', 'doc', 'docs']
  deleteDir.map((item) => shell.rm('-rf', pwd + `/${projectName}/${item}`))

  // 自定义配置: projectName
  let jsonData: any = fs.readFileSync(`${pwd}/${projectName}/package.json`).toString('utf-8')
  jsonData = JSON.parse(jsonData)
  jsonData['name'] = projectName
  jsonData['version'] = '1.0.0'
  let obj = JSON.stringify(jsonData, null, '\t')
  let sss = fs.writeFileSync(`${pwd}/${projectName}/package.json`, obj)

  // 自动安装依赖
  const installSpinner = ora('正在安装依赖...').start()
  if (shell.exec(`cd ${projectName} && npm i`).code !== 0) {
    console.log(logSymbols.warning, chalk.yellow('自动安装失败，请手动安装！'))
    installSpinner.fail()
    shell.exit(1)
  }
  installSpinner.succeed(chalk.green('依赖安装成功！'))
}

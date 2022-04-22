import gitclone from 'git-clone/promise'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'

/**
 * 克隆项目到本地
 * @param branchName 分支名称
 * @param templateGitUrl git 地址
 * @param downloadPath 本地存放路径
 * @returns
 */
export const gitClone = (branchName: string = 'master', templateGitUrl: string, downloadPath: string) => {
  const loading = ora('download template')
  return new Promise(async (resolve, reject) => {
    try {
      loading.start('start download template')
      await gitclone(templateGitUrl, downloadPath, { checkout: branchName, shallow: true })
      fs.removeSync(path.join(downloadPath, '.git'))
      loading.stop()
      loading.succeed('download success')
      resolve('download success')
    } catch (error) {
      reject(error)
      loading.stop()
      loading.fail('download fail')
    }
  })
}

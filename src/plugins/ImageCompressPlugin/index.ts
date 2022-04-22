import fs from 'fs-extra'
import { Command } from 'commander'
import { CommandPlugin } from '../../interface/plugin'
import chalk from 'chalk'
import shell from 'shelljs'
import ora from 'ora'
import path from 'path'
import { compressImg, saveFile } from '../../utils/img'

const exts = ['.jpg', '.png']
const MAX = 5200000 // 5MB == 5242848.754299136

/**
 * 遍历文件夹获取所有文件
 */
const getAllFile = (filePath: string, filePathArr: string[]): string[] => {
  if (!fs.statSync(filePath).isDirectory()) {
    filePathArr.push(filePath)
    return filePathArr
  }

  fs.readdirSync(filePath).forEach((file) => {
    getAllFile(path.join(filePath, file), filePathArr)
  })
  return filePathArr
}

/**
 * 图片压缩插件
 */
export class ImageCompressPlugin implements CommandPlugin {
  addPlugin(program: Command) {
    program
      .command('compress')
      .description('图片压缩, 支持 <=5M 的图片')
      .action(async () => {
        const pwd = shell.pwd()
        const files = getAllFile(pwd.toString(), [])
        // console.log(files)

        // filter, get all png/jpg
        const pngFiles = files.filter((file) => {
          const stats = fs.statSync(file)
          return stats.size <= MAX && stats.isFile() && exts.includes(path.extname(file))
        })
        // console.log(pngFiles)

        for (let index = 0; index < pngFiles.length; index++) {
          const lastSize = fs.statSync(pngFiles[index]).size
          const promptPng = ora(`压缩图片 ${index + 1}/${pngFiles.length}: ${pngFiles[index]}, ${lastSize}`).start()
          const compressResult = await compressImg(pngFiles[index])

          // save url to local
          const sp = compressResult.output.url.split('/')
          // const newFilePath = `files/${sp[sp.length - 1]}.${compressResult.output.type.split('/')[1]}`
          await saveFile(compressResult.output.url, pngFiles[index])

          const newSize = fs.statSync(pngFiles[index]).size
          const percent = ((newSize * 100) / lastSize).toFixed(2)
          promptPng.succeed(
            chalk.green(
              `压缩图片 ${index + 1}/${pngFiles.length}: ${pngFiles[index]}, ${lastSize}=>${newSize} ${percent}%`
            )
          )
        }
      })
  }
}

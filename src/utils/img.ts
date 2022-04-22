import { readFileSync, writeFile } from 'fs-extra'
import { getRandomIP, tinyPngOptions } from './tinypng'
import { request, get } from 'https'

/**
 * 压缩图片
 * @param filePath 图片文件地址
 * @returns
 */
export const compressImg = async (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    tinyPngOptions.headers['X-Forwarded-For'] = getRandomIP()
    const req = request(tinyPngOptions as any, (res) => {
      res.on('data', (buf) => {
        const obj = JSON.parse(buf.toString())
        if (obj.error) {
          console.log(`[${filePath}]：压缩失败！报错：${obj.message}`)
          resolve(null)
        } else {
          // fileUpdate(img, obj);
          resolve(obj)
        }
      })
    })
    req.write(readFileSync(filePath), 'binary')
    req.on('error', (e) => {
      console.error(e)
      reject(e)
    })
    req.end()
  })
}

/**
 * 下载文件到本地
 * @param imgUrl https://tinypng.com/web/output/dg9j3mkb3ngbceqw3nnybhxcd24z25dc
 * @returns
 */
export const saveFile = async (imgUrl: string, filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    get(imgUrl, (res) => {
      let imgData = ''
      res.setEncoding('binary')
      res.on('data', function (chunk) {
        imgData += chunk
      })
      res.on('end', function () {
        if (imgData) {
          writeFile(filePath, imgData, 'binary', function (err) {
            if (err) {
              // console.log('down fail')
              reject()
            }
            resolve(null)
            // console.log('down success')
          })
        } else {
          // console.log('下载失败！,图片路径不存在！')
          reject()
        }
      })
    })
  })
}

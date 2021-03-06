import config from '../config'
import { ysToken } from './fly'
export default {
  /**
   * 上传单张图片
   * @param filePath 要上传文件资源的路径 (本地路径)
   * @return url String
   */
  uploadFile(filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config.URL_UPLOAD,
        filePath,
        header: { 'Authorization': `Bearer ${ysToken}` },
        name: 'file', // 根据后端接口而定
        formData: {}, // 根据后端接口而定
        success: (res) => {
          console.log('uploadFile success===>', res.data)
          const data = JSON.parse(res.data)
          if (data.code === 200) {
            resolve(data.data.url)
          } else {
            reject(data)
          }
        },
        fail: (err) => {
          console.log('uploadFile fail===>', err)
          reject(err)
        }
      })
    })
  },
  /**
   * 上传多张图片
   * @param filePaths 要上传文件资源的路径 (数组)
   * @return urls Array
   */
  uploadFiles(filePaths) {
    let urls = []
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < filePaths.length; i++) {
        await this.uploadFile(filePaths[i]).then((url) => {
          urls[i] = url
        }).catch((err) => {
          reject(err)
        })
      }
      resolve(urls)
    })
  }
}
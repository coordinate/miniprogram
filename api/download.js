export default {
  /**
   * 下载单张图片
   * @param url 下载资源的 url
   * @param filePath 指定文件下载后存储的路径 (本地路径)
   * @return tempFilePath String
   */
  downloadFile(url, filePath) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        filePath,
        success: (res) => {
          console.log('downloadFile success===>', res)
          if (res.statusCode === 200) {
            if (filePath) {
              resolve(res.filePath)
            } else {
              resolve(res.tempFilePath)
            }
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          console.log('downloadFile fail===>', err)
          reject(err)
        }
      })
    })
  }
}
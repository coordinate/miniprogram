export default {
  /**
   * 下载单张图片
   * @param url 下载资源的 url
   * @param fileName 指定文件名字
   * @return tempFilePath String
   */
  downloadFile(url, fileName) {
    return new Promise((resolve, reject) => {
      let options = {
        url,
        success: (res) => {
          console.log('downloadFile success===>', res)
          if (res.statusCode === 200) {
            resolve(res.filePath || res.tempFilePath)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          console.log('downloadFile fail===>', err)
          reject(err)
        }
      }
      if (fileName) { // 指定文件下载后存储的路径 (本地路径)
        options.filePath = `${wx.env.USER_DATA_PATH}/${fileName}${getFileExtendingName(url)}`
        // 删除其他已打开文件，来释放缓存（目前本地文件缓存空间提升至200M）
        // const fs = wx.getFileSystemManager()
        // const res = fs.readdirSync(wx.env.USER_DATA_PATH)
        // const files = res.filter(v => v.indexOf('.') !== -1)
        // for (const file of files) {
        //   fs.unlinkSync(`${wx.env.USER_DATA_PATH}/${file}`)
        // }
      }
      wx.downloadFile(options)
    })
  }
}

// 文件扩展名匹配正则
const getFileExtendingName = (filename) => {
  const matches = filename.match(/\.[^\.]+$/)
  if (matches) return matches[0]
  return ''
}
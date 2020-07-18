import fly from './fly'
import socket from './socket'
import upload from './upload'
import download from './download'
export default {
  ...socket, // socket
  ...upload, // 上传文件
  ...download, // 下载文件
  // 获取sessionKey
  getSessionKey(params) {
    return fly.get('/login/getSessionKey', params)
  },
  // 获取手机号
  getPhone(params) {
    return fly.post('/login/getPhone', params)
  }
}
# miniprogram

## 安装使用
- 使用微信开发者工具导入项目，点击调试器下的 mock 选择导入项目根目录的 mock.config.json 文件并启用 mock
- 更新git远程子模块运行 `git submodule update --remote`

## 目录结构
```
├─api ---------------- // 接口封装
│ └─lib -------------- // api库
├─behaviors ---------- // 公用逻辑模块
│ └─pagination ------- // 分页逻辑
├─components --------- // 自定义组件
│ └─painter ---------- // 分享图插件
├─constants ---------- // 常量
├─images ------------- // 静态资源
├─miniprogram_npm ---- // npm包
│ ├─@we-debug -------- // 调试工具
│ ├─dayjs ------------ // 时间处理工具
│ ├─deepmerge -------- // 调试工具插件
│ └─parser-wx -------- // 富文本插件
├─pages -------------- // 页面
│ └─index ------------ // 首页
├─style -------------- // 样式库
├─template ----------- // 自定义模版
│ └─loadmore --------- // 加载更多
├─utils -------------- // 工具封装
│ └─lib -------------- // 工具库
└─wxs ---------------- // wxs
  └─filter ----------- // 过滤器
```

## 功能点&BUG
- 基础库 2.10.2 版本起，异步 API 支持 callback & promise 两种调用方式
- 使用 this.route 来获取当前页面路径，填在分享路径理面
- constants 用于存放项目特定常量
- dayjs配置中文只能在app.js里面进行配置

## 参考文档
- [使用 Component 构造器构造页面](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
- [behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)
- [模板](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html)
- [WXS](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/)
- [mock](https://developers.weixin.qq.com/miniprogram/dev/devtools/api-mock.html)
- [小程序扩展组件库](https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/)
- [WeUI组件库](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)
- [分享图插件 Painter](https://github.com/Kujiale-Mobile/Painter)
- [富文本插件 Parser](https://github.com/jin-yufeng/Parser)
- [图表插件 echarts](https://github.com/ecomfe/echarts-for-weixin)
- [Fly.js](https://github.com/wendux/fly)
- [Day.js](https://day.js.org/zh-CN/)
- [调试工具 we-debug](https://github.com/dlhandsome/we-debug)
- [小程序打点库 anka-tracker](https://github.com/iException/anka-tracker)
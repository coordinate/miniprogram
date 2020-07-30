# miniprogram

## 安装使用
- 克隆代码运行 `git clone https://gitlab.hello4am.com/yinshi/miniprogram.git --recurse-submodules`

## 目录结构
```
├─api ---------------- // 接口封装
│ └─lib -------------- // api库
├─behaviors ---------- // 公用逻辑模块
│ └─pagination ------- // 分页
├─components --------- // 自定义组件
│ └─painter ---------- // 分享图插件
├─constants ---------- // 常量
├─images ------------- // 静态资源
├─miniprogram_npm ---- // npm包
│ ├─dayjs ------------ // 时间处理工具
| └─parser-wx -------- // 富文本插件
├─pages -------------- // 页面
│ └─index ------------ // 首页
├─style -------------- // 样式库（子模块）
├─template ----------- // 自定义模版
│ └─loading ---------- // 加载更多
├─utils -------------- // 工具封装
│ └─lib -------------- // 工具库
└─wxs ---------------- // wxs
```

## 功能点&BUG
- 基础库 2.10.2 版本起，异步 API 支持 callback & promise 两种调用方式
- 使用 this.route 来获取当前页面路径，填在分享路径理面

## 参考文档
- [使用 Component 构造器构造页面](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
- [behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)
- [模板](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html)
- [WXS](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/)
- [小程序扩展组件库](https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/)
- [WeUI组件库](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)
- [分享图插件 Painter](https://github.com/Kujiale-Mobile/Painter)
- [富文本插件 Parser](https://github.com/jin-yufeng/Parser)
- [Fly.js](https://github.com/wendux/fly)
- [Day.js](https://day.js.org/zh-CN/)
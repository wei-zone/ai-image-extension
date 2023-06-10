# ai-image

ai-image

## 技术点

1、openai

[https://chat.openai.com/chat](https://chat.openai.com/chat)

2、 vue3 + elementPlus

[elementPlus](https://element-plus.org/zh-CN/)

## 目录解析

```
├── readme.md
├── vite.config.js
├── vite.content.config.js
├── local
│   ├── assets
│   │   ├── img
│   │   │   ├── logo.png
│   ├── background
│   ├── contentScript
│   ├── popup
│   ├── manifest.json
├── package.json
├── src
│   ├── assets
│   │   ├── img
│   │   │   ├── logo.png
│   ├── background
│   ├── contentScript
│   ├── popup
│   └── plugin
│   └── libs
│   ├── manifest.json
└── package.json
└── pnpm-lock.yaml
```

## vue3插件模式

1、vue3初始化


2、代码改造

删除main.js等，添加background、contentScript、popup，修改入口文件，
改造成浏览器插件所需模式。


3、添加elementPlus，配置组件库按需引入，vue语法糖自动引入




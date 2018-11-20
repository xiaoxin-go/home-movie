# home-movie

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


设置封面：在演员详情页面，可点击某个设置为演员封面
1. 获取影片和演员ID
2. 将影片图片写入到演员图片信息中

收藏：用户登录情况下，点击收藏可将电影设置为用户收藏
1. 获取电影ID和当前登录用户ID
2. 将信息加入到收藏表中

删除单个影片： 在任何界面，可点击删除某个影片
1. 获取影片ID
2. 从数据库中删除影片

关注演员： 在演员详情页，可点击关注某个演员关注
1. 获取演员ID和当前登录用户ID
2. 将用户和演员信息对应存入关注表中


需要完善
1. performer页面显示
2. 退出功能
3. 修改密码

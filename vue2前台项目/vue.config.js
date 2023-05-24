// vue.config.js
module.exports = {
  lintOnSave: false, // 关闭eslint语法检查
  devServer: {
    // 代理
    proxy: {
      '/api': {
        // target: 'http://39.99.186.36', // 目标地址
        // target: 'http://182.92.128.115', // 服务器地址
        // target: 'http://39.98.123.211',
        target: 'http://gmall-h5-api.atguigu.cn',
        // target: 'http://139.198.152.148:8510',


        changeOrigin: true // 是否跨域
      }
    }
  }
}
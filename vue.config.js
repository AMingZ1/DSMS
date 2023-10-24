// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave:false,
//   devServer:{
//     host:'localhost',
//     port:8080,
//     proxy:{
//       '/api':{
//         target:'http://192.168.3.114:8080',
//         changeOrigin:true,
//         ws:true,
//         pathRewrite:{
//           '^/api':'/'
//         }
//       }
//     }
//   }

// })
//引入jquery文件
const webpack = require("webpack");

module.exports = { 
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  },
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
     proxy: null
    //  {
    //   '/api': {
    //     target: 'http://192.168.3.1:8080',
    //     pathRewrite: {
    //       '^/api': '/'
    //     },
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
    } 
}
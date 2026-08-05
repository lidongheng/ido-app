const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, 'src/icons'),
          // 覆盖 Vue CLI 默认的 SVG 资源类型，使图标由 svg-sprite-loader 输出。
          type: 'javascript/auto',
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]'
              }
            }
          ]
        }
      ]
    }
  }
})

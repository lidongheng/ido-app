const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true,
        // Element Plus 表格调整尺寸时的浏览器通知不应阻断开发页面。
        runtimeErrors: (error) => {
          return error.message !== 'ResizeObserver loop limit exceeded'
            && error.message !== 'ResizeObserver loop completed with undelivered notifications.';
        }
      }
    }
  },
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

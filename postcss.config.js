module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度的1/10，这里假设设计稿为375px
      propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
      selectorBlackList: [], // 不进行px转换的选择器，vant组件已经做了转换
      exclude: /node_modules/i // 忽略node_modules目录下的文件
    }
  }
}


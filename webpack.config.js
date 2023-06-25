const path = require('path');

module.exports = {
  mode: 'development', // 模式（开发模式/生产模式）
  entry: './src/index.js', // 入口文件路径
  output: { // 输出文件配置
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: { // 模块规则（如处理 CSS、Less 等文件）
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // 将 CSS 插入页面
          'css-loader', // 处理导入语句
          'less-loader' // 将 Less 编译为 CSS
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true // 如果是 .sass 文件，需要设置这个选项
              },
            },
          },
        ],
      },
    ]
  }
};

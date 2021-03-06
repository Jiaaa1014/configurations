# Here are some pieces that I put together.

```shell
$ yarn add webpack --dev
```

## Simplest version：
```js
const path = require('path')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname + '/webpackconDir'),
    // path: __dirname + '/webpackconDire',
    filename: "build.js"
  },
}
```
and current project diretory has `wevpackconDir/build.js`

## Add `watch` in `modules.export`(failed, found at 01/23/2018)
As we change or modify the file, it automatically runs `webpack`
```js
watch: true
```

## We used to add `<link>` at the `index.html` to styling, if wanna try wrapping .css files by webpack?

Because config hasn't get the clear mission yet, got warning `You may need an appropriate loader to handle this file type`

#### step1. So first downlaod package using `yarn` 'cause `npm` sucks...
```shell
$ yarn add css-laoder style-loader -D
```
#### step2a. Then configure the webpack.config.js
```js
module: {
  rules: [{
    test: /\.css$/,
    use: {
      loader: 'style-loader',
      loader: 'css-loader'
    }
  }]
}
```
can be replaced by
```js
loader: 'style-loader!css-loader'
```

**It's no longer allowed to omit the '-loader' suffix when using loaders.**

## If add some content to `index.js` and create a `IIFE.jsx` file
```js
ReactDOM.render(<h1>index.js</h1>, document.getElementById('root'))
```
```shell
$ yarn add babel-loader babel-preset-react -D
```
and add these config in the `rules`
```js
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react']
      }
    }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
```

## Completed!!!
```js
const path = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(`${__dirname}/webpackconDir`),
    filename: 'build.js'
  },

  watch: true,
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react']
      }
    }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

```
## Instances
```js
{ test: /\.css$/, loader: "style-loader!css-loader" },
{ test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9]|\?[a-z0-9]+)?$/, loader: 'url-loader' },
{ test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" },
{ test: /\.bmp$/, loader: "url-loader?mimetype=image/bmp" },
{ test: /\.png$/, loader: "url-loader?mimetype=image/png" },
{ test: /\.scss$/, loaders: ["style", "css", "sass"] },
```      

## References
[設定 babel-loader 來編譯 ES6, ES7, ES8, ES-Next 的程式碼！ ](https://ithelp.ithome.com.tw/articles/10194549)

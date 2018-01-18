
```shell
$ yarn add webpack --dev
```

## most simple version：
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

## Add `watch` in `modules.export`, same level as `output`. 
As we change or modify the file, it automatically runs `webpack`
```js
watch: true
```
## We used to add `<link>` at the `index.html` to styling, if wanna try wrapping .css files by webpack?

Because config hasn't get the clear mission yet, that warn `You may need an appropriate loader to handle this file type`

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
#### step2b. Another way to set `loader`
**It's no longer allowed to omit the '-loader' suffix when using loaders.**

```js
    use: {
      loader: 'style-loader',
      loader: 'css-loader'
    }
```
can replace by
```js
loader: 'style-loader!css-loader'
```

## If we add some content to `index.js`
```js
ReactDOM.render(<h1>index.js</h1>, document.getElementById('root'))
```
we have to 
```shell
$ yarn add babel-loader babel-preset-react -D
```
and add these config in the `rules`
```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: { presets: ['react'] }
}
```
and I found that `.babelrc` doesnt matter.


## Completed!!!
```js
const path = require('path')

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname + '/webpackconDir'),
    // path: __dirname + '/webpackconDire',
    filename: "build.js"
  },

  watch: true,
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
      // loader: '!style!css' cannot omit '-loader'
      // use: {
      //   loader: 'style-loader',
      //   loader: 'css-loader'
      // }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react']
      }
    }

    ]
  }
}
```


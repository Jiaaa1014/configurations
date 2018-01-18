
# Wrapppp tool

```shell
$ yarn add webpack --dev
```

most simple version：
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
and ur project diretory has `wevpackconDir/build.js`了

Add `watch` in `modules.export`, same level as `output`
```js
watch: true
```
Traditionally, we add `<link>` at the `index.html` to styling, if try wrapping .css by webpack?

Config hasn't get the clear mission yet, and get the warning `You may need an appropriate loader to handle this file type`

So first downlaod package using `yarn` cause `npm` sucks...
```shell
$ yarn add css-laoder style-loader -D
```

then

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
if the `index.js` adding some content
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

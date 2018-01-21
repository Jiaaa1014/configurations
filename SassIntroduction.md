
# Temporarily preparation 

```shell
$ npm i -g node-sass
```
Using the as cli, `-w` means that automatically compiling as modifying or save the .scss files.
```shell
$ node-sass -w /styling/SignUp.scss  /styling/SignUp.css
# this input means 'C:\styling\SignUp.scss', of course it doesnt work.
```
```shell
$ node-sass -w ./src/styling/scss/SignUp.scss  ./src/styling/css/SignUp.css
# equal to
$ node-sass -w ./src/styling/scss -o ./src/styling/css
```

Although I remove the `sass-loader` config at `webpack.config.js`, it doesnt trigger any error, maybe `node-sass` output the .css files and `webpack` just only thanks to `node-sass` 'yeah you simplify my tasks'?
```shell
# part of content removed
{
  test: /\.scss$/,
  loader: 'style-loader!css-loader!sass-loader'
}
```

# References
[sass-loader performance](https://github.com/webpack-contrib/sass-loader/issues/296)
[How to compile or convert sass / scss to css with node-sass (no Ruby)?](https://stackoverflow.com/questions/31448114/how-to-compile-or-convert-sass-scss-to-css-with-node-sass-no-ruby)

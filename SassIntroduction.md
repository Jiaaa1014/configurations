
# Temporarily preparation 

```shell
$ npm i -g node-sass
```
## Using the as cli 
`-w` means that automatically compiling.
```shell
$ node-sass -w /styling/SignUp.scss  /styling/SignUp.css
# this input means 'C:\styling\SignUp.scss', of course it doesnt work.
```
## Simple example: one to one
```shell
# file to file
$ node-sass -w ./src/styling/scss/SignUp.scss  ./src/styling/css/SignUp.css

# dir to dir
# equal to 
$ node-sass -w ./src/styling/scss -o ./src/styling/css
```

## If there are many independent .sass file and only need one output of .css?

just using `_` to name child .scss and then add `@import './btn';` to father. 

```
├─css
│      SignUp.css
│
└─scss
        SignUp.scss
        _btn.scss
```
## Although I removed the `sass-loader` config at `webpack.config.js`, it doesnt trigger any error, maybe `node-sass` output the .css files so `webpack` just only thanks to `node-sass` 'hey, you simplify my tasks'?
```shell
# part of content removed
{
  test: /\.scss$/,
  loader: 'style-loader!css-loader!sass-loader'
}
```
It works fine without `sass-loader` previously installed that you follow someone's way to do so.


# References
* [sass-loader performance](https://github.com/webpack-contrib/sass-loader/issues/296)
* [How to compile or convert sass / scss to css with node-sass (no Ruby)?](https://stackoverflow.com/questions/31448114/how-to-compile-or-convert-sass-scss-to-css-with-node-sass-no-ruby)
* [multiple files to one](https://stackoverflow.com/questions/13025865/sass-compass-compile-all-css-file-to-one)

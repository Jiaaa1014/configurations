## References
* [如何写好.babelrc？Babel的presets和plugins配置解析](https://excaliburhan.com/post/babel-preset-and-plugins.html)
* [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)
* [Babel的使用](https://segmentfault.com/a/1190000008159877)

## modules


ES6、ES7、ES8等等出新來瀏覽器跟不上，所以在寫code的時候，要小心地引入一些package

1. `babel-cli`，還沒用過，遇到再來困擾

2. `babel-core`，把js分析成AST，新的語法還不適用所有瀏覽器，所以需要它轉成低版本的js

3. `babel-loader`: 大功能，將常見的LESS, SASS, CoffeeScript, CSS等等的轉譯(transpiler)成.js檔案以方面文件引入，或插入DOM之類的，anything to JS。

4. `babel-ployfill`，補丁、補牆上的洞的概念，在執行環境中複製尚未存在的原生代碼。
    ```shell
    $ npm install --save babel-polyfill
    ```
    
    [參考這篇](https://remysharp.com/2010/10/08/what-is-a-polyfill)
    > fill the hole in the browser where the technology needed to be.
 
5. `babel-runtime`，當作分散版、局部版的`babel-polyfill`

    總之呢這個滿重要的，除了在`.babelrc`和`webpack.config.js`設定常用到的plugin`babel-plugin-transform-runtime`需要它。

    ```shell
    $ npm install babel-plugin-transform-runtime --save-dev
    $ npm install babel-runtime --save
    ```
    ```js
    {
      "plugins": [
        "transform-runtime",
        "transform-es2015-classes"
      ]
    }
    ```
6. `babel-preset-xxx`，可以設置使用市佔率、瀏覽器、要不要console.log等…
    
    a. `babel-preset-2015`，就是要用到es6，所以在`.babelrc`加入
    ```js
    {
      "presets": ["es2015"]
    }
    ```
    阿它包含許多plugins例如：`transform-es2015-spread`、`transform-regenerator`林林總總21個
    ```js
    {
      "plugins": ["transform-es2015-spread", "transform-regenerator"]
    }
    ```
    慢慢把plugins安裝的話，大概就像這樣= =
    ```shell
    $ npm install --save-dev babel-plugin-check-es2015-constants
    $ npm install --save-dev babel-plugin-transform-es2015-sticky-regex
    ...
    ```
    倒不如`npm install babel-preset-es2015`，一組直接打包就好
    
    b. `babel-preset-2016`，也就是`es7`，一個plugin，指數不需要`Math.pow`直接用`**`代替
    ```shell
    npm install --save-dev babel-plugin-transform-exponentiation-operator
    ```
    
    c. `babel-preset-2017`，`es8`
    
    `syntax-trailing-function-commas`，就是Git檢查你改了哪些東西時減少不必要的麻煩
    允許最後一個param加上","，之後有c參數要放進去，檢查how many line -+時比較純粹，不要驚動不相干的行數
    ```js
    function func(
    a,
    b,
    ) {}
    ```
    
    d. `babel-preset-latest`，暴力，包含三年分的量。
    
    e. `babel-preset-react`
    
      * `preset-flow`：規定資料型態，包含plugin`transform-flow-strip-types`
      ```shell
      $ npm install --save-dev babel-preset-flow
      ```
      ```js
      {
         "presets": ["flow"]
      }
      ```
      * `syntax-jsx`：parsingJSX用的，詳細的工作內容下面的負責
      * `transform-react-jsx`
      * `transform-react-display-name`
    
    f. `babel-preset-stage-x` as x = 0, 1, 2, 3
    數字越小越新，反正這些stage都比lastest新，但都還沒被標準化

    * stage-4不存在，這裡提及給個概念而已，包括es2015-2017
    * stage-3包括stage-4，以及兩個plugins：

    - `transform-object-rest-spread`like destructing and spread
    - `transform-async-generator-functions`

    * stage-0好玩的，拿JSX當例子

    - `transform-do-expressions`，do loop by expression
    
    ```js
    const getColoredComponent = color => {
      if(color === 'blue') { return <BlueComponent/>; }
      if(color === 'red') { return <RedComponent/>; }
      if(color === 'green') { return <GreenComponent/>; }
    }

    const Component = props =>
      <div className='myComponent'>
        {getColoredComponent()}
      </div>
    ;
    ```
    可以轉為
    
    ```js
    const Component = props =>
      <div className='myComponent'>
        {do {
          if(color === 'blue') { <BlueComponent/>; }
          else if(color === 'red') { <RedComponent/>; }
          else if(color === 'green') { <GreenComponent/>; }
        }}
      </div>
    ;

    ```

    - `transform-function-bind`
    ```js
    obj::func
    // is equivalent to:
    func.bind(obj)
    ```
7. **`babel-preset-env`視需求拿需要的，這樣壓力比較小，推推**
    ```shell
    npm install babel-preset-env --save-dev
    ```
    ```js
    {
      "presets": [
          [
            "env",
            {
              "targets": {
                "browsers": ["last 2 versions", "ie >= 7"],
                "chrome": 56
              }
            }
          ]
        ]
      }
    }
    ```

8. 第3點提過，`babel-loader`，配合webpack的        
    ```shell
    $ npm install babel-loader babel-core babel-preset-es2015 babel-plugin-transform-runtime webpack --save-dev       
    ```
    ```shell
    $ npm install babel-runtime --save
    ```
    `webpack.config.js`長這樣，雖然裝了`babel-runtime`沒在設定檔使用到，但是`babel-plugin-transform-runtime`需要它
    ```js
    module.exports = {
      entry: './entry.js',
      output: {
        path: __dirname,
        filename: 'bundle.js'
      },
      module: {
        rules: [{
          loader: 'babel',
          test: /\.jsx?$/,
          include: path.join(__dirname, 'src'),
          query: {
            plugins: ['transform-runtime'],
            presets: [
              ["env", {
                "targets": {
                  "chrome": 52
                },
                "modules": false,
                "loose": true
              }],
              'stage-2',
              'react'
            ],
          }
        }]
      }
    ```
 
## .babelrc
[other's gist](https://gist.github.com/rmoorman/94eeed830942758e218d92f15ce58d88)
[someone's gist](https://gist.github.com/eddyerburgh/b569d23402611d14b40a2e4a1d534292)
[reactjs/redux](https://github.com/reactjs/redux/blob/master/.babelrc)

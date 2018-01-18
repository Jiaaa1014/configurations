import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'

import './console'
import './console2'

console.log('filename: ', __filename)
console.log('dirname: ', __dirname)

console.warn('show me where am I')

ReactDOM.render(<h1>index.js</h1>, document.getElementById('root'))


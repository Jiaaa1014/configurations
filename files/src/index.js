import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import App, { B } from './App'
import './IIFE'
import './console'

B()
console.log('After Call B() function from ./IIFE')
ReactDOM.render(<App />, document.getElementById('root'))


import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

const root = document.createElement('div')

ReactDom.render(<App />, root)

root.id = 'root'

document.body.appendChild(root)
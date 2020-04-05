import React from 'react'
import { HashRouter, Route, Switch as Routes } from 'react-router-dom'
import styled from 'styled-components'
import Menu from '../components/Menu'
import Home from '../containers/Home'
import AlbumTypewriter from '../containers/AlbumTypewriter'
// const Home = () => import('../containers/Home')

const Wrap = styled.div({
  position: 'relative',
  userSelect: 'none',
})

const menus = [
  {
    id: 'goddess festival',
    name: '女神节快乐',
    path: '/album-typewriter'
  }
]

const router = (
  <Wrap>
    <HashRouter>
      <Menu menus={menus} />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/album-typewriter" component={AlbumTypewriter} />
      </Routes>
    </HashRouter>
  </Wrap>
)

export default router
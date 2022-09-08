import React from 'react'
import './App.css';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import Login from './pages/Login/index' 
import GoTo from './pages/GoTo/index'
import NotFound from './pages/NotFound/index'
import ShowLink from './pages/ShowLink/index'

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path={'/'} component={Login}/>
        <Route exact path={'/show/:id'} component={ShowLink}/>
        <Route path={'/not-found'} component={NotFound}/>
        <Route exact path={'/:short'} component={GoTo}/>
        <Redirect to={'/not-found'} />
      </Switch>
    </Router>
  )
}

export default App;
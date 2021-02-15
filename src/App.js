import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Users from './components/Users/Users'
import Posts from './components/Posts/Posts'
import store from './redux/store'

import './scss/styles.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route path='/' exact={true} component={Users} />
        <Route path='/posts/:userId' exact={true} component={Posts} />
      </Switch>
    </Provider>
  )
}
const EnhancedApp = withRouter(App);
const AppRouter = props => (
  <Router>
    <EnhancedApp {...props} />
  </Router>
)
export default AppRouter

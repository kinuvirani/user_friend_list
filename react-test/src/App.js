import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashoboard from './components/Dashoboard';
import Friends from './components/Dashoboard/friends';
import PendingRequests from './components/Dashoboard/pending';
import PrivateRoute from './routes/PrivateRoute';
import LoginRoute from './routes/LoginRoute';

function App() {
  return (
      <Router>
          <Switch>
              <LoginRoute exact path='/signup' component={Signup}/>
              <LoginRoute exact path='/signin' component={Signin}/>
              <PrivateRoute exact path='/pending-requests' component={PendingRequests}/>
              <PrivateRoute exact path='/friends' component={Friends}/>
              <PrivateRoute exact path='/' component={Dashoboard}/>
          </Switch>
      </Router>
  );
}

export default App;

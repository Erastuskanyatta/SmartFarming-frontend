import React from 'react';

import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/SignUp" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;

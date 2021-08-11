import React from 'react'
import Converter from './pages/converter';
import Header from './components/Header';
import Courses from './pages/courses';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {




  return (
    <>
      <Router>
        <Header />
        <div className="container mt-3">
          <Switch>
            <Route path="/converter" component={Converter} />
            <Route path="/courses" component={Courses} />
          </Switch>
        </div>
      </Router>


    </>
  );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header';
import Landing from './pages/Landing';
import Explorer from './pages/Explorer';
import Create from './pages/Create';
import Bounty from './pages/Bounty';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Route path="/" exact component={Landing} />
        <Route path="/explorer" component={Explorer} />
        <Route path="/create" component={Create} />
        <Router path="/bounty/:org?" component={Bounty} />
      </Router>
    </div>
  );
}

export default App;

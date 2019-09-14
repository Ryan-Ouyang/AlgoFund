import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header';
import Landing from './pages/Landing';
import Explorer from './pages/Explorer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Route path="/" exact component={Landing} />
        <Route path="/explorer" component={Explorer} />
      </Router>
    </div>
  );
}

export default App;

// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Preferences from './pages/Preferences';
import config from './aws-exports';
import Stock from './pages/Stocks';

Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut }) => (
          <>
            <Navbar signOut={signOut} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stocks" element={<Stock />} />
              <Route path="/preferences" element={<Preferences />} />
            </Routes>
          </>
        )}
      </Authenticator>
    </div>
  );
}

export default App;

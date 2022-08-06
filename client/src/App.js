import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites'
import Homepage from './pages/Homepage'
import User from './pages/User'
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<Homepage />} 
          />
          <Route 
            path='/saved' 
            element={<Favorites />} 
          />
          <Route 
          path='/user'
          element={<User />}
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Picture from './pages/Picture';
import Video from './pages/Video';

function App() {   //app funtion that runs the home page
  return (
    <div className="App">
      <Router basename='/'>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/picture' element={<Picture/>}/>
            <Route path='/video' element={<Video/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
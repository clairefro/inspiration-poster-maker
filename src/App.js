import React from 'react';
import './styles/index.scss';

import PhotoCanvas from './components/photoCanvas'

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Inspirational Poster Maker</h1>
        <PhotoCanvas />
      </div>
    </div>
  );
}

export default App;

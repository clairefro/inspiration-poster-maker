import React from 'react';
import './styles/index.scss';

import PhotoCanvas from './components/photoCanvas'

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Inspire Me</h1>
        <PhotoCanvas />
      </div>
    </div>
  );
}

export default App;

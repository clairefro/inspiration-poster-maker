import React, { useState } from 'react';

import Thumb from './thumb'
import Editor from './editor'

const ENDPOINT = 'https://api.unsplash.com/search/photos?page=1&query='
const nothingToSeeHere = 'Client-ID Cccme_EruAfcmSox6ljTI3SdiYavskzRJnEqfO8splI'

const PhotoCanvas = () => {
  const [query, setQuery] = useState('')
  const [thumbs, setThumbs] = useState([])
  const [selected, setSelected] = useState('')

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const getPhotos = () => {
    fetch(ENDPOINT + query, {
      method: 'GET',
      headers: {
        'Authorization': nothingToSeeHere,
      }
    })
    .then(res => res.json())
    .then(data => {
      setThumbs(data.results.slice(0,5))
    })
  }

  const setSelectedPhoto = (data) => {
    setSelected(data)
  }

  return (
    <div className="photo-canvas">
      <div className="search-box">
        <input type="text" name="search" onChange={handleChange} value={query} placeholder="Enter keyword"/>
        <button onClick={getPhotos}>Find images</button>
      </div>

      <div className="thumbs">
        {thumbs.map((t,i) => (
          <Thumb
            key={i}
            data={t}
            setSelectedPhoto={setSelectedPhoto}
            isSelected={selected.id === t.id ? true : null}
          />
        ))}
      </div>

      <Editor data={selected} />

    </div>
  );
}


export default PhotoCanvas;

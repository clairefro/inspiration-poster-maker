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

  const getPhotos = (e) => {
    e.preventDefault()
    console.log(e)
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
        <form id="search-form" onSubmit={getPhotos}>
          <input type="text" name="search" onChange={handleChange} value={query} placeholder="ex: mountain"/>
          <button type="submit" form="search-form">Find images</button>
        </form>
      </div>

      {thumbs.length === 0 ?
        <p>What inspires you...</p> :
        <h3>Pick a thumbnail</h3>
      }
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

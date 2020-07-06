import React from 'react';

const Thumb = ({ data, setSelectedPhoto, isSelected }) => {
  const aspectRatio = data.height/data.width
  const thumbWidth = 100
  const thumbHeight = thumbWidth * aspectRatio

  const handleClick = () => {
    setSelectedPhoto(data)
  }
  return (
    <button
      onClick={handleClick}
      className={`thumb ${isSelected? 'selected' : null}`}
      style={{backgroundImage: `url(${data.urls.thumb})`, width: thumbWidth, height: thumbHeight}}>
    </button>
  );
}

export default Thumb;

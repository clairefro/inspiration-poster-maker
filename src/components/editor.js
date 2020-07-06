import React, { useState, useEffect, useRef } from 'react'

import canvasToImage from 'canvas-to-image'

const Editor = ({ data }) => {
  const canvasRef = useRef()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  const imgRawWidth = data.width
  const imgRawHeight = data.height

  const aspectRatio = imgRawHeight/imgRawWidth

  const imgWidth = 600
  const imgHeight = imgWidth * aspectRatio

  const canvasWidth = 900
  const canvasHeight = imgHeight + 230

  const imgOffsetX = (canvasWidth-imgWidth)/2
  const imgOffsetY = (canvasHeight-imgHeight)/4


  const draw = (src, t, st) =>{
    t = t.toUpperCase().split('').join(' ')
    var ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    var img = new Image();
    img.setAttribute('crossorigin', 'anonymous');
    img.onload = function(){
      ctx.drawImage(img,imgOffsetX,imgOffsetY,imgWidth, imgHeight);
      };
    img.src = src;

    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 5;
    ctx.strokeRect(imgOffsetX,imgOffsetY,imgWidth,imgHeight);

    ctx.fillStyle = '#FFF';
    ctx.textAlign = "center";
    ctx.font = "60px bold arial";
    ctx.fillText(t, canvasWidth/2, canvasHeight-100);
    ctx.font = "24px regular arial";
    ctx.fillText(st, canvasWidth/2, canvasHeight-50);
  }

  useEffect(()=> {
    if(data) {
      draw(data.urls.full, title, subtitle)
    }
  },[data, title, subtitle])

  if (!data) return null

  const options = {
    name: 'very_inspirational_poster', // default image
    type: 'jpg',         // default png, accepted values jpg or png
    quality: 0.9,         // default 1, can select any value from 0 to 1 range
  }

  const handleExport = () => {
    canvasToImage(canvasRef.current, options);
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleSubtitle = (e) => {
    setSubtitle(e.target.value)
  }

  return (
    <div className="editor">
      <div className="edit-controls">
        <div className="edit-inputs">
          <input type="text" onChange={handleTitle} value={title} placeholder="TITLE" />
          <input type="text" onChange={handleSubtitle} value={subtitle} placeholder="Subtitle"/>
        </div>
        <button onClick={handleExport}>Export .jpg</button>
      </div>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{width: '100%', height: '100%'}}
      >
      </canvas>
    </div>
  );
}

export default Editor;

import React, { useEffect, useRef } from 'react';

const Editor = ({ data }) => {
  const canvasRef = useRef()

  const aspectRatio = data.height/data.width

  const canvasWidth = 300;
  const canvasHeight = canvasWidth * aspectRatio

  const imgWidth = 200
  const imgHeight = imgWidth * aspectRatio

  const imgOffsetX = (canvasWidth-imgWidth)/2
  const imgOffsetY = (canvasHeight-imgHeight)/4


  const draw = () =>{
    var ctx = canvasRef.current.getContext('2d');
    var img = new Image();
    img.onload = function(){
      ctx.drawImage(img,imgOffsetX,imgOffsetY,imgWidth, imgHeight);
      };
    img.src = data.urls.full;

    ctx.strokeStyle = '#FFF';
    ctx.strokeRect(imgOffsetX,imgOffsetY,imgWidth, imgHeight);

    ctx.fillStyle = '#FFF';
    ctx.textAlign = "center";
    ctx.fillText("Hello World!", canvasWidth/2, canvasHeight-20);
  }

  useEffect(()=> {
    if(data) {
      draw()
    }
  },[data])

  if (!data) return null
  return (
    <div className="editor">
      <canvas
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

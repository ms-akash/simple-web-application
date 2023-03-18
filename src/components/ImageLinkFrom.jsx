import React from 'react';
import './ImageLinkForm.css'

function ImageLinkFrom({onSearchChange, onButtonClick}) {
  return (
    <div>
      <p className="f3">
            {
                'Detect images in the given pictures.' 
            }
      </p>
      <div className="center">
        <div className='center form shadow-5 pa3 br3'>
        <input className='f4 pa2 w-70 center' type="text" onChange={onSearchChange}></input>
        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonClick}>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkFrom;

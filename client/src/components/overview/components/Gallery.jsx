import React, { useState, useEffect, useRef } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import Zoom from './Zoom.jsx'

function usePrevious(value) { //credit: Ohans Emmanuel
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

export default function Gallery({ style, noDefault }) {
  const [photos, setPhotos] = useState([])
  const [photo, setPhoto] = useState('')
  const [expand, setExpand] = useState(true)
  const prevStyle = usePrevious(style)
  const newPhotos = useRef(style.photos)

  // on load/style change, set side photos and main photo to default
  useEffect(() => {
    // handle no default image
    noDefault ? setPhotos([{thumbnail_url: "https://i.postimg.cc/gjFHrzW3/image-4.png"}])
      : setPhotos(style.photos)
    if(photos && !photo){setPhoto(photos[0])}
    else{
      if(photos!==newPhotos && style!==prevStyle) {
        setPhoto(newPhotos[0])
      }
    }
  },[{}])

  // onClick function - input: img, output: change of gallery main photo
  function changePhoto(prop) {
    setPhoto(prop)
  }

  // onClick function to collapse/uncollapse gallery img
  function expandPhoto(prop){
    if(expand === true) {
      document.getElementsByClassName('img-main')[0].style.width = '1000px'
      document.getElementsByClassName('img-main')[0].style.cursor = 'zoom-out'
      document.getElementsByClassName('right')[0].style.visibility = 'hidden'
    } else {
      document.getElementsByClassName('img-main')[0].style.width = '500px'
      document.getElementsByClassName('img-main')[0].style.cursor = 'zoom-in'
      document.getElementsByClassName('right')[0].style.visibility = 'visible'
    }
  }

  return(
    <div className="left">
      <div className="gallery-list">{photos ? (<div>{photos.map(photo => <p key={photo.url}><img src={photo.thumbnail_url} onClick={e=>{e.preventDefault();changePhoto(photo)}} /></p>)}</div>) : null}</div>
      <div className="gallery-main" onClick={e=>{setExpand(!expand);expandPhoto()}}>
        {photo ?
          expand ?
            <><img className="img-main" src={photo.thumbnail_url}/><FaExpand  className="expand-icon" /></>
            : <><Zoom src={photo.thumbnail_url}/><FaCompress className="expand-icon" /></>
        : null}
      </div>

    </div>
  )
}



import React from 'react';
import '../../App.css'

const GalleryItem = ({ item, title }) => {
  return (
    <div className='card'>
      <div className='card-inner'>
        <div className='card-front'>
        <img src={"https://oren-epstein.com/oe_img/thumbs/" + item} alt='' />
        </div>
        <div className='card-back'>
         {title}
        </div>
      </div>
    </div>
  )
}

export default GalleryItem

import React from 'react'
import GalleryItem from './GalleryItem'
import Spinner from '../ui/Spinner'

const GalleryGrid = ({ items, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section className='cards'>
      {items.map((item) => (
        <GalleryItem key={item.id} item={item.thumb}></GalleryItem>
      ))}
    </section>
  )
}

export default GalleryGrid

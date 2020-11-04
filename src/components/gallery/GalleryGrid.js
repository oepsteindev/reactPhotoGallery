import React from 'react'
import GalleryItem from './GalleryItem'
import Spinner from '../ui/Spinner'
import '../../App.css'

const GalleryGrid = ({ items, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section className='cards'>
      {items.map((item) => (
        <GalleryItem key={item.id} item={item.thumb} title={item.title} desc={item.description}></GalleryItem>
      ))}
    </section>
  )
}

export default GalleryGrid

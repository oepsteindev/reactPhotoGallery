import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GalleryGrid from './components/gallery/GalleryGrid'
import Contactmefooter from './components/vue/Contactmefooter'
import Todo from './components/react/todo'
import Search from './components/ui/Search'
import './App.css'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  let url = `https://oren-epstein.com/thumblist`;

  if (query) {
      url = `https://oren-epstein.com/full/${query}`;
  }

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
         ` ${url}`
          
      )

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])

  return (
      <div className='container'>
          <Contactmefooter />
          <Todo/>
          <Search getQuery={(q) => setQuery(q)} />
      <GalleryGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default App

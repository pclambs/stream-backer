import React, { useEffect } from 'react'
import { useSearch } from '../contexts/SearchContext'
import FilterTags from '../components/FilterTags'
import VideoPlayer from '../components/VideoPlayer'

const tags = [
  { name: 'All', id: 'all' },
  { name: 'Art', id: 'art' },
  { name: 'Music', id: 'music' },
  { name: 'Gaming', id: 'gaming' },
  { name: 'Podcasts', id: 'podcasts' },
  { name: 'DIY', id: 'diy' },
]


const Home = () => {
  const { selectedTags, setSelectedTags } = useSearch()

  useEffect(() => {
    setSelectedTags(['all'])
  }, [setSelectedTags])

  const handleToggleTag = (tag) => {
    if (tag.id === 'all') {
      setSelectedTags(['all'])
      return
    } else {
      setSelectedTags((prevSelectedTags) => {
        if (prevSelectedTags.includes(tag.id)) {
          return prevSelectedTags.filter((id) => id !== tag.id)
        } else {
          return [...prevSelectedTags.filter((id) => id !== 'all'), tag.id]
        }
      })
    }
  }

  return (
    <div>
      <div>
        <FilterTags
          tags={tags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
      </div>

      <VideoPlayer />
  
    </div>
  )
}

export default Home

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

  const handleToggleTag = (tagId) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagId)) {
        return prevSelectedTags.filter((id) => id !== tagId)
      } else {
        return [...prevSelectedTags, tagId]
      }
    })
  }

  return (
    <div>
      <div>
      <FilterTags
        tags={tags}
        selectedTags={selectedTags}
        onToggleTag={(tag) => handleToggleTag(tag.id)}
      />

      </div>

      <VideoPlayer />
  
    </div>
  )
}

export default Home

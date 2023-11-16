import React, { useEffect } from 'react'
import { useQuery, gql } from "@apollo/client"
import { useSearch } from '../contexts/SearchContext'
import FilterTags from '../components/FilterTags'
import ThumbnailCard from '../components/ThumbnailCard'
import { Container, Grid } from "@mui/material"
import { QUERY_VIDEOPOSTS } from "../utils/queries"


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

  const { loading, error, data } = useQuery(QUERY_VIDEOPOSTS)

  const videoPosts = data?.videoPosts || []

  return (
    <Container maxWidth="xl" disableGutters>
      <div>
        <FilterTags
          tags={tags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
      </div>

      <Container disableGutters sx={{marginY: 1.2}}>
        <Grid container spacing={2}>
          {videoPosts.map((videoPost) => {
            return (
              <ThumbnailCard videoPost={videoPost} key={videoPost._id}/>
            )
          })}
         
        </Grid>
      </Container>
  
    </Container>
  )
}

export default Home
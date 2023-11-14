import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {useLocation, useParams} from 'react-router-dom'
import {QUERY_SINGLE_VIDEOPOST} from '../utils/queries'
import VideoPlayer from "../components/VideoPlayer"
import CommentContainer from "../components/CommentContainer"
import { Box, Container } from "@mui/material"

import auth from "../utils/auth"

const loggedIn = auth.loggedIn()

const Video = () => {

    const location = useLocation()
    const {videoPostId} = useParams()
    const {loading, error, data} = useQuery(QUERY_SINGLE_VIDEOPOST, {variables: {videoPostId}})

    const videoPost = data?.videoPost || {}
    const comments = videoPost?.comments || []

  return (
    <Container disableGutters>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{marginTop: 1}}>
        {/* display error */}
        {error && <p>{error.message}</p>}
        {/* display loading */}
        {loading && <p>Loading...</p>}
        {/* create video player and pass in videoPost object */}
        {Object.keys(videoPost).length > 0 && <VideoPlayer videoPost={videoPost}/>}
        <CommentContainer comments={comments} />
      </Box>
    </Container>
  )
}

export default Video;

import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {useLocation, useParams} from 'react-router-dom'
import {QUERY_SINGLE_VIDEOPOST} from '../utils/queries'
import VideoPlayer from "../components/VideoPlayer"
import CommentContainer from "../components/CommentContainer"


const Video = () => {

  // TODO add comment variable
    // const [comments, setComments] = useState([])
    // const [videoPost, setVideoPost] = useState([{}])
    const location = useLocation()
    const {videoPostId} = useParams()
    const {loading, error, data} = useQuery(QUERY_SINGLE_VIDEOPOST, {variables: {videoPostId}})

    const videoPost = data?.videoPost || {}
    const comments = videoPost?.comments || []

    console.log(data, error)

  // useEffect(() => {
    
  //   // set videoPost state to videoPost variable to use with VideoPlayer
  //   if (data?.videoPost) {
  //     setVideoPost(data.videoPost)
  //     console.log(data.videoPost)
  //     // set comment state to comment array or blank array
  //       setComments(data.videoPost.comments || []) 
  //   }    
  // }, [data])

  return (
    <div>
      {/* display error */}
    {error && <p>{error.message}</p>}
    {/* display loading */}
    {loading && <p>Loading...</p>}
    {/* create video player and pass in videoPost object */}
    {/* {Object.keys(videoPost).length > 0 && <VideoPlayer videoPost={videoPost}/>}
    

    <CommentContainer comments={comments} /> */}
  </div>
  )
}
export default Video;

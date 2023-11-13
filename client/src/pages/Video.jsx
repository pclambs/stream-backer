import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {useLocation, useParams} from 'react-router-dom'
import {QUERY_SINGLE_VIDEOPOST} from '../utils/queries'
import VideoPlayer from "../components/VideoPlayer"
import CommentContainer from "../components/CommentContainer"




const Video = () => {

  // TODO add comment variable
    const [comments, setComments] = useState([])
    const location = useLocation()
    const {videoPostId} = useParams()
    const {loading, error, data} = useQuery(QUERY_SINGLE_VIDEOPOST, {variables: {videoPostId}})
  

  useEffect(() => {
    if (data && data.videoPost.comments) {
      setComments(data.videoPost.comments)
    }
  }, [data])

  return (
    <div>
    {error && <p>{error.message}</p>}
    {loading && <p>Loading...</p>}
    <VideoPlayer videoData={data?.videoPost}/>
    <CommentContainer comments={comments} />
  </div>
  )
}
export default Video;

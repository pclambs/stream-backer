import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {QUERY_SINGLE_VIDEOPOST} from '../utils/queries'
import VideoPlayer from "../components/VideoPlayer"
import CommentContainer from "../components/CommentContainer"




const Video = () => {

  // TODO add comment variable
  const [comments, setComments] = useState([])
  const {loading, error, data} = useQuery(QUERY_SINGLE_VIDEOPOST)
  

  useEffect(() => {
    if (data && data.comments) {
      setComments(data.comments)
    }
  }, [data])

  return (
    <div>
    {error && <p>{error}</p>}
    {loading && <p>Loading...</p>}
    <VideoPlayer />
    <CommentContainer comments={data.comments} />
  </div>
  )
}
export default Video;

import VideoPlayer from "../components/VideoPlayer"
import CommentContainer from "../components/CommentContainer"


const Video = () => {

  // TODO add comment variable
  const comments = ''

  return <div>
    <VideoPlayer />
    <CommentContainer comments={comments} />

  </div>;
};
export default Video;

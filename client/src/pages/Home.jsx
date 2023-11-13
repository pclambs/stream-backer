import { useQuery } from '@apollo/client';
import { QUERY_VIDEOPOSTS } from '../utils/queries';
import VideoPlayer from '../components/VideoPlayer';

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_VIDEOPOSTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  
  //creates random post to display
  const randomPost = data.videoPosts[Math.floor(Math.random() * data.videoPosts.length)]

    //displays random post
  return (
    <div>
      <VideoPlayer videoPost={randomPost} />
    </div>
  );
};

export default Home
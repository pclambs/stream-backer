import { useQuery } from '@apollo/client';
import { QUERY_PROFILES } from '../utils/queries'
import VideoPlayer from '../components/VideoPlayer'



const Home = () => {

  return (
    <div>

      <VideoPlayer />
  
    </div>
  );
}

export default Home;

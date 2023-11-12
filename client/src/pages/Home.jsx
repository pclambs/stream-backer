import { useQuery } from '@apollo/client';
import { QUERY_PROFILES } from '../utils/queries'
import NavBar from '../components/NavBar'
import VideoPlayer from '../components/VideoPlayer'



const Home = () => {

  return (
    <div>
      <NavBar />
      <VideoPlayer />
  
    </div>
  );
}

export default Home;

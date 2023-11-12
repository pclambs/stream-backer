import { useQuery } from '@apollo/client';
import { QUERY_PROFILES } from '../utils/queries'
import NavBar from '../components/NavBar'
import Video from '../components/Video'



const Home = () => {

  return (
    <div>
      <NavBar />
      <Video />
  
    </div>
  );
}

export default Home;

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import ProfileCard from '../components/ProfileCard';
import Auth from '../utils/auth';

const Profile = () => {
  const isLoggedIn = Auth.loggedIn()
  const { profileId } = useParams();
  console.log(profileId)
  const { loading, error, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId },
  });
  
  console.log('Data', data)
  const profile = data?.profile || {};

  console.log('profile', profile);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>
       Welcome {profile.username} !
      </h2>
      <ProfileCard isLoggedIn={ isLoggedIn } profile={ profile }/>
    </div>
  );
};

export default Profile;

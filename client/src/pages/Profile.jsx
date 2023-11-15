import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
  });

  const profile = data?.profile || {};

  console.log('profile', profile);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ProfileCard />,
    <div>
      <h2>
        {/* change this back to name if it doesn't work */}
       Welcome {profile.username}!
      </h2>
    </div>
  );
};

export default Profile;

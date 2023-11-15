import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import auth from '../utils/auth';
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
  const [updateUser] = useMutation(UPDATE_PROFILE)
  console.log('profile', profile);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ProfileCard isLoggedIn={ isLoggedIn } profile={ profile }/>
      ,
      <h2>
        {/* change this back to name if it doesn't work */}
       Welcome {profile.username} !
      </h2>
      <ProfileCard />
      <UserForm initialValue={
        {...profile, profileId: loggedInUserId}} onSubmit={(userBody)=> updateUser({
        variables: userBody
      })}/>
    </div>
  );
};

export default Profile;

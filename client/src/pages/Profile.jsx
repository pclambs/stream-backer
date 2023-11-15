import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';
import { UPDATE_PROFILE } from '../utils/mutations';
import UserForm from '../components/UserForm';

const Profile = () => {
  const loggedInUserId = Auth.loggedIn()
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
      <h2>
       Welcome {profile.username} !
      </h2>
      {/* <ProfileCard /> */}
      <UserForm initialValue={
        {...profile, profileId: loggedInUserId}} onSubmit={(userBody)=> updateUser({
        variables: userBody
      })}/>
    </div>
  );
};

export default Profile;

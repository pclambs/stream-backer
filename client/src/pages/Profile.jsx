import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
<<<<<<< HEAD
import { UPDATE_PROFILE } from '../utils/mutations';
import UserForm from '../components/UserForm';
import ProfileCard from '../components/ProfileCard'


const Profile = () => {
const loggedInUserId = auth.getProfile()?.data?._id

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: loggedInUserId },
=======
import ProfileCard from '../components/ProfileCard';
import Auth from '../utils/auth';

const Profile = () => {
  const isLoggedIn = Auth.loggedIn()
  const { profileId } = useParams();
  console.log(profileId)
  const { loading, error, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId },
>>>>>>> my-backup2
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
<<<<<<< HEAD
       Welcome {profile.username}!
=======
        {/* change this back to name if it doesn't work */}
       Welcome {profile.username} !
>>>>>>> my-backup2
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

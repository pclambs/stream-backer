import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import auth from "../utils/auth";
import { QUERY_SINGLE_PROFILE } from "../utils/queries";
import { UPDATE_PROFILE } from "../utils/mutations";
import UserForm from "../components/UserForm";
// import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  const loggedInUserId = auth.getProfile()?.data?._id;

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: loggedInUserId },
  });

  const profile = data?.profile || {};
  const [updateUser] = useMutation(UPDATE_PROFILE);
  console.log("profile", profile);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Welcome {profile.username}!</h2>
      {/* <ProfileCard /> */}
      <UserForm
        initialValue={{ ...profile, profileId: loggedInUserId }}
        onSubmit={(userBody) =>
          updateUser({
            variables: userBody,
          })
        }
      />
    </div>
  );
};

export default Profile;

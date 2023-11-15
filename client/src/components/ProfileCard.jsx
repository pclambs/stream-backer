import {
  Paper, Stack, Box,
} from "@mui/material";
import { styled } from "@mui/material/styles"
import Auth from '../utils/auth'
import ProfileAvatar from "./ProfileAvatar";

const ProfilePaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));
const ProfileCard = (isLoggedIn, profile) => {



  return (
    <Stack direction="row" spacing={2}>

    <ProfilePaper variant="outlined" square={false} >About Me</ProfilePaper>
    </Stack>
    );
  }


export default ProfileCard;

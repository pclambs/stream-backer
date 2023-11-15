import {
  Paper, Stack, Box,
} from "@mui/material";
import Auth from '../utils/auth'
import ProfileAvatar from "./ProfileAvatar";
const ProfileCard = (isLoggedIn, profile) => {

  return (
    <Grid item xs={4}>
      <Paper square elevation={3}>
        <Button
          sx={{
            padding: 0,
          }}
        >
        </Button>
        <Box paddingX={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box paddingY={1}>
              <Typography variant="h6" component="h2">            
               <ProfileAvatar profile={profile}/>
              </Typography>
              
              
            </Box>
            <Tooltip title="Username">
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}


export default ProfileCard;

import {
  Paper, Grid, Box, Typography, Tooltip,IconButton, Button,
} from "@mui/material";
import UserAvatar from "./UserAvatar";

const ProfileCard = () => {
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
                {/* TODO: import userInfo */}
              </Typography>
            </Box>
            <Tooltip title="Username">
              <IconButton>
                <UserAvatar />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}


export default ProfileCard;

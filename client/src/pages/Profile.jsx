import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_SINGLE_PROFILE } from "../utils/queries";
import { UPDATE_PROFILE } from "../utils/mutations";
import UserForm from "../components/UserForm";
import ProfileAvatar from "../components/ProfileAvatar";
import CustomTextField from '../components/CustomTextField'
import { Container, Box, Stack, Paper, CardHeader, Tooltip, IconButton, CardContent, Typography, Grid } from "@mui/material"
import { formatDistanceToNow } from "date-fns"


const Profile = () => {
  const isLoggedIn = Auth.loggedIn()
  const loggedInUserId = Auth.getProfile()?.data?._id;

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: loggedInUserId },
  });

  const profile = data?.profile || {};
  const [updateUser] = useMutation(UPDATE_PROFILE);
  console.log("profile", profile)

  const timestamp = Number(profile.createdAt)
	const date = new Date(timestamp)
  console.log("date", date)
	const relativeTime = formatDistanceToNow(date, { addSuffix: true })

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: 5
      }}
    >
      <Grid container spacing={2}>
        {/* Profile Info Card */}
        <Grid item xs={4}>
          <Paper
            elevation={2}
            sx={{ width: "100%" }}
          >
            <CardHeader
              sx={{
                borderBottom: 1,
                borderColor: "primary.main",
                mx: "16px",
                px: "0px"
              }}
              avatar={
                <Tooltip
                  title="Change Avatar"
                  PopperProps={{
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -7], // X, Y
                        },
                      },
                    ],
                  }}
                >
                  <ProfileAvatar 
                    profile={profile}
                    // sx={{ width: 100, height: 100 }}
                  />
                </Tooltip>
              }
              action={
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    marginRight: "10px",
                    transform: "translateY(5px)"
                  }}
                >

                </Stack>
              }
              title={
                <Typography component="h1" variant="h3">{profile.username}</Typography>
              }
              // subheader={`Joined ${relativeTime}`}
            />
            <CardContent>
            <CustomTextField
            name="description"
            id="comment-input"
            type="text"
            // value={}
            // onChange={}
            variant='standard'
            rows={4}
            multiline
            label='About You:'
            helperText=""
            sx={{
              width: "100%"
            }}
          />
              <Typography component="p" variant="body2" color="text.secondary">

              </Typography>
            </CardContent>
          </Paper>
        </Grid>
        {/* Profile's Posted Videos Section */}
        <Grid item xs={8} sx={{ }}>

        </Grid>
      </Grid>

    </Container>




    // <Container 
    //   sx={{ 
    //     border: 1,
    //     borderColor: "primary.main",
    //     marginTop: 10
    //   }}
    // >
    //   <Stack 
    //     direction="row" 
    //     spacing={1}
    //     sx={{
    //       marginRight: "10px",
    //       transform: "translateY(5px)"
    //     }}
    //   >
    //     <UserAvatar />
    //     <h2>{profile.username}</h2>
    //   </Stack>
    //   <UserForm
    //     initialValue={{ ...profile, profileId: loggedInUserId }}
    //     onSubmit={(userBody) =>
    //       updateUser({
    //         variables: userBody,
    //       })
    //     }
    //   />
    // </Container>
  );
};

export default Profile;

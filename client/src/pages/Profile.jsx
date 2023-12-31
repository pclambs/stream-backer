import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import Auth from "../utils/auth"
import { QUERY_SINGLE_PROFILE } from "../utils/queries"
import { UPDATE_PROFILE } from "../utils/mutations"
import UserForm from "../components/UserForm"
import ProfileAvatar from "../components/ProfileAvatar"
import CustomTextField from '../components/CustomTextField'
import { Container, Box, Stack, Paper, CardHeader, Tooltip, IconButton, CardContent, Typography, Grid, Fab } from "@mui/material"
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { getRelativeTime } from "../utils/helpers"
import ThumbnailCard from "../components/ThumbnailCard"
import theme from '../utils/theme'


const Profile = () => {
  const isLoggedIn = Auth.loggedIn()
	const loggedInUserId = isLoggedIn ? Auth.getProfile()?.data?._id : null

  const { profileId } = useParams()
  const isMyProfile = profileId === loggedInUserId

  const [isEditMode, setIsEditMode] = useState(false)
  const [tempBio, setTempBio] = useState("")

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId },
    fetchPolicy: "cache-and-network"
  })

  const profile = data?.profile || {}
  const videos = profile?.uploadedVideos || []
  const sortedVideoPosts = [...videos].sort((a, b) => parseInt(b.createdAt, 10) - parseInt(a.createdAt, 10))

  useEffect(() => {
    if (profile?.bio) {
      setTempBio(profile.bio)
    }
  }, [profile])

  const [updateUser] = useMutation(UPDATE_PROFILE)

  const relativeTime = getRelativeTime(profile.createdAt)

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: 5
      }}
    >
      {profile && Object.keys(profile).length > 0 ? (
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
                      // sx={{ 
                      //   width: theme.spacing(4), 
                      //   height: theme.spacing(4) 
                      // }}
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
                    <Stack
                      direction="row"
                      justifyContent="end"
                    >
                      {isMyProfile &&
                        <Tooltip
                          title="Edit Profile"
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
                          <Fab 
                            color="info" 
                            size="small" 
                            aria-label="Edit" 
                            onClick={() => setIsEditMode(!isEditMode)}
                          >
                            {isEditMode ? <KeyboardReturnIcon /> : <ModeEditIcon />}
                          </Fab>
                        </Tooltip>
                      }
                    </Stack>
                  </Stack>
                }
                title={
                  <Typography component="h1" variant="h3">{profile.username}</Typography>
                }
                subheader={`Joined ${relativeTime}`}
              />
              <CardContent>
                {isMyProfile && isEditMode ? (

                  <UserForm
                    initialValue={{ ...profile, profileId: loggedInUserId }}
                    onSubmit={(userBody) =>
                      updateUser({
                        variables: userBody,
                      })
                    }
                  />

                  // <CustomTextField
                  // name="description"
                  // id="comment-input"
                  // type="text"
                  // value={tempBio}
                  // onChange={event => setTempBio(event.target.value)}
                  // variant='standard'
                  // rows={4}
                  // multiline
                  // label='About You:'
                  // helperText=""
                  // sx={{
                  //   width: "100%"
                  // }}
                  // />
                ) : (
                  <Typography
                    component="p"
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflowWrap: "break-word"
                    }}
                  >
                    {tempBio}
                  </Typography>
                )}
              </CardContent>
            </Paper>
          </Grid>
          {/* Profile's Posted Videos Section */}
          <Grid item xs={8} sx={{}}>
            <Grid container spacing={2}>
              {sortedVideoPosts.map(videoPost => <ThumbnailCard videoPost={videoPost} key={videoPost._id} />)}
            </Grid>
          </Grid>
        </Grid>
      ) : (<p>No Profile Found</p>)}

    </Container>
  );
};

export default Profile

import * as React from "react";
import {useState} from 'react'
import { Box, Typography } from "@mui/material"
import ProfileAvatar from "./ProfileAvatar"
import { formatDistanceToNow } from "date-fns"

import { useTheme } from "@mui/material/styles";

const VideoPlayer = ({videoPost}) => {
  const theme = useTheme();
  // const vp = JSON.stringify(videoPost, null, 2)
  // console.log(vp)

  if (!videoPost) {
    return <p>No video found</p>
  }

  const {title, thumbnail, postedBy, videoSRC, description, createdAt} = videoPost

  const timestamp = Number(createdAt)
  const date = new Date(timestamp)
  const relativeTime = formatDistanceToNow(date, { addSuffix: true })

  return (
    <>
      <video controls autoPlay name="media"><source src={videoSRC} type="video/mp4" className="video"/></video>
      <Box sx={{textAlign: 'left', padding: '.5rem'}}>
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",  
            marginLeft: "0",       
          }}
        >
          {title}
        </Typography>
        <Box marginTop={.5} sx={{ margin: '0,0,0,0', display: 'flex', alignItems: 'center'}}>
          <ProfileAvatar profile={postedBy} />
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '.5rem'}}>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {postedBy.username}
            </Typography>
            <Typography
              sx={{
                fontSize: ".8rem",
                fontStyle: "italic",
                color: theme.palette.text.secondary,
              }}
            >
              {relativeTime}
            </Typography>
          </Box>
        </Box>
            <Typography
              color="textSecondary"
              marginTop={1}
            >
              {description}
            </Typography>
      </Box>
    </>
  )
}

export default VideoPlayer

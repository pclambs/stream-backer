import * as React from "react";
import {useState} from 'react'

import { useTheme } from "@mui/material/styles";

const VideoPlayer = ({videoPost}) => {
  const theme = useTheme();
  // const vp = JSON.stringify(videoPost, null, 2)
  // console.log(vp)

  if (!videoPost) {
    return <p>No video found</p>
  }

  const {title, thumbnail, postedBy, videoSRC, createdAt} = videoPost



  return (
    <video controls autoPlay muted name="media"><source src={videoSRC} type="video/mp4"/></video>
  )
}

export default VideoPlayer

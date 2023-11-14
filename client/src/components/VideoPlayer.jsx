import * as React from "react";
import {useState} from 'react'
import 'mui-player/dist/mui-player.min.css'
import MuiPlayer from 'mui-player'

import { useTheme } from "@mui/material/styles";

const VideoPlayer = ({videoPost}) => {
  const theme = useTheme();
  // const vp = JSON.stringify(videoPost, null, 2)
  // console.log(vp)

  if (!videoPost) {
    return <p>No video found</p>
  }

  const {title, thumbnail, postedBy, videoSRC, createdAt} = videoPost

  const mp = new MuiPlayer({
    container:'#mui-player',
    title: title,
    src: videoSRC,
})

  return (
    <div id="mui-player"></div>
  )
}

export default VideoPlayer

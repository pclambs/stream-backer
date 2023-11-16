import React from "react"
import { Avatar, IconButton } from "@mui/material"

const ProfileAvatar = React.forwardRef((props, ref) => {
  const { profile } = props
  const initial = profile.username.charAt(0).toUpperCase()

  return (
    <Avatar
      ref={ref}
      {...props}
      profile={ profile }
      sx={{ width: 38, height: 38, backgroundColor: "#bd279f" }}
    >
      <IconButton sx={{ width: 38, height: 38, fontSize: "1.1rem" }}>
        {initial}
      </IconButton>
    </Avatar>
  )
})

export default ProfileAvatar

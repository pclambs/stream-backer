import React from "react"
import Auth from "../utils/auth"
import { Avatar, IconButton } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const UserAvatar = React.forwardRef((props, ref) => {
  const isLoggedIn = Auth.loggedIn()
  const profile = isLoggedIn ? Auth.getProfile() : null

  if (isLoggedIn && profile) {
    // if logged in, display avatar with users initial
    const initial = profile.data.username.charAt(0).toUpperCase()
    return (
      <Avatar ref={ref} {...props} sx={{ width: 34, height: 34, backgroundColor: '#bd279f'}}>
        <IconButton sx={{ fontSize: '1rem' }}>
          {initial}
        </IconButton>
      </Avatar>
    )
  } else {
    // if not logged in, display default user icon
    return (
      <AccountCircleIcon ref={ref} {...props} sx={{ width: 38, height: 38 }} />
    )
  }
})

export default UserAvatar
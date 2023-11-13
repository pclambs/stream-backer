import React from "react"
import Auth from "../utils/auth"
import Avatar from "@mui/material/Avatar"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const UserAvatar = () => {
  const isLoggedIn = Auth.loggedIn()
  const profile = isLoggedIn ? Auth.getProfile() : null

  if (isLoggedIn && profile) {
    // if logged in, display avatar with users initial
    const initial = profile.data.username.charAt(0).toUpperCase()
    return (
      <Avatar sx={{ width: 38, height: 38, fontSize: '1.2rem', backgroundColor: '#bd279f'}}>
        {initial}
      </Avatar>
    )
  } else {
    // if not logged in, display default user icon
    return (
      <AccountCircleIcon sx={{ width: 38, height: 38 }} />
    )
  }
}

export default UserAvatar
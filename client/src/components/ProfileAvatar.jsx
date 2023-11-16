import React from "react"
import { Avatar, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ProfileAvatar = React.forwardRef((props, ref) => {
  const { profile } = props
  const initial = profile.username.charAt(0).toUpperCase()
  const navigate = useNavigate()

  const handleAvatarClick = () => {
    let path = `/profile/${profile._id}`
    setTimeout(() => {
      navigate(path)
    }, 200)
  }

  return (
    <Avatar
      ref={ref}
      {...props}
      profile={ profile }
      sx={{ backgroundColor: "#bd279f" }}
      onClick={handleAvatarClick}
    >
      <IconButton sx={{ fontSize: "1.1rem" }}>
        {initial} 
      </IconButton>
    </Avatar>
  )
})

export default ProfileAvatar

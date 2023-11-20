import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Typography, Tooltip, IconButton, ListItemIcon } from "@mui/material"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { REMOVE_VIDEO_POST } from '../utils/mutations';

const EditAndDeleteMenu = ({ videoPost, comment }) => {

  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [removeVideoPost] = useMutation(REMOVE_VIDEO_POST)

  const handleDeleteVideoPost = async () => {
    try {
      await removeVideoPost({
        variables: { videoPostId: videoPost._id}
      })
      handleCloseUserMenu()
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <Tooltip title="Options">
        <IconButton
          onClick={handleOpenUserMenu}
          size="small"
          sx={{
            padding: "0"
          }}
        >
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => {handleDeleteVideoPost()}}>
          <ListItemIcon>
            <EditIcon sx={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.875rem' }}>Edit</Typography>
        </MenuItem>

        <MenuItem onClick={() => {handleDeleteVideoPost()}}>
          <ListItemIcon>
            <DeleteIcon color="error" sx={{ fontSize: '1.25rem' }} />
          </ListItemIcon>
          <Typography color="error" sx={{ fontSize: '0.875rem' }}>Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default EditAndDeleteMenu
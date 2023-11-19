import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../utils/auth'
import SearchBar from './SearchBar'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../contexts/SearchContext'
import UserAvatar from './UserAvatar'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import UploadIcon from '@mui/icons-material/Upload'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import SignupIcon from '@mui/icons-material/PersonAdd'

import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  MenuItem, ListItemIcon, Container, Tooltip,
} from '@mui/material'

import logo from '../assets/stream-backer.png'
import playLogo from '../assets/stream-backer-play-logo.png'

const logout = (event) => {
  Auth.logout()
}

function Header() {
  const navigate = useNavigate()
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null

  const [search, setSearch] = useState("")
  const settings = Auth.loggedIn()
    ? [
      { title: "Profile", link: `/profile/${userId}`, icon: <PersonIcon sx={{ fontSize: '1.25rem' }} /> },
      { title: "Account", link: "/account", icon: <SettingsIcon sx={{ fontSize: '1.25rem' }} /> },
      { title: "Upload", link: "/upload", icon: <UploadIcon sx={{ fontSize: '1.25rem' }} /> },
      { title: "Log out", action: logout, icon: <LogoutIcon sx={{ fontSize: '1.25rem', transform: 'translateX(2px)' }} /> }
    ] : [
      { title: "Log in", link: "/login", icon: <LoginIcon sx={{ fontSize: '1.25rem' }} /> },
      { title: "Sign up", link: "/signup", icon: <SignupIcon sx={{ fontSize: '1.25rem' }} /> }
    ]

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <header>
      <AppBar position="static">
        <Container disableGutters maxWidth="lg" sx={{ minHeight: '50px' }}>
          <Toolbar disableGutters sx={{
            alignItems: 'center',
            minHeight: '50px',
            maxHeight: '50px',
          }}>

            {/* Left-aligned items */}
            <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '50px' }}>
              <Link to="/">
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <img src={logo} alt='Main Logo' className='logo' />
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  <img src={playLogo} alt='Play Logo' className='play-logo' />
                </Box>
              </Link>
            </Box>

            {/* Centered SearchBar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <SearchBar
                search={search}
                setSearch={setSearch}
                sx={{
                  maxWidth: { xs: 300, sm: 400, md: 500 }
                }}
              />
            </Box>

            {/* Right-aligned items */}
            <Box 
              className="header-avatar"
            >
              <Tooltip 
                title="Open settings" 
                PopperProps={{
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -8], // X, Y
                      },
                    },
                  ],
                }}
              >
                <UserAvatar onClick={handleOpenUserMenu} />
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={() => {
                      handleCloseUserMenu()
                      if (setting.link) {
                        navigate(setting.link)
                      } else if (setting.action) {
                        setting.action()
                      } else if (setting.title === "Log out") {
                        logout()
                      }
                    }}
                  >
                    <ListItemIcon>
                      {setting.icon}
                    </ListItemIcon>
                    <Typography textAlign="center" sx={{ fontSize: '0.875rem' }}>
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}

export default Header

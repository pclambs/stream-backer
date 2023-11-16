import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../utils/auth'
import SearchBar from './SearchBar'
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
  event.preventDefault()
  Auth.logout()
}

function Header() {
  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const [search, setSearch] = useState("")
  const settings = Auth.loggedIn()
    ? [
      { title: "Profile", link: `/profile/${userId}`, icon: <PersonIcon />},
      { title: "Account", link: "/account", icon: <SettingsIcon />},
      { title: "Upload", link: "/upload", icon: <UploadIcon />}, 
      { title: "Log out", action: logout, icon: <LogoutIcon />}
    ] : [
      { title: "Log in", link: "/login", icon: <LoginIcon /> }, 
      { title: "Sign up", link: "/signup", icon: <SignupIcon /> }
    ]
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <header>
      <AppBar position="static">
        <Container disableGutters maxWidth="xl" sx={{ minHeight: '50px'}}>
          <Toolbar disableGutters sx={{ 
            alignItems: 'center',
            minHeight: '50px',
            maxHeight: '50px',
          }}>

            {/* Left-aligned items */}
            <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '50px' }}>
              <Link to="/">
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <img src={logo} alt='Main Logo' className='logo'/>
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  <img src={playLogo} alt='Play Logo' className='play-logo'/>
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
            <Box sx={{
                display: 'flex', 
                justifyContent: 'flex-end', 
                margin: { 
                  xs: '0 .44rem 0 1rem', // xs to sm breakpoint
                  sm: '0 .8rem 0 1rem'  // md breakpoint and up
                }
            }}>
              <Tooltip title="Open settings"  >
                <UserAvatar onClick={handleOpenUserMenu}/>
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
                  <MenuItem key={setting.title || setting} onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                      {setting.icon}
                    </ListItemIcon>
                    {setting.link ? (
                      <Link to={setting.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography textAlign="center">{setting.title}</Typography>
                      </Link>
                    ) : (
                      <Typography textAlign="center" onClick={setting.action}>{setting.title || setting}</Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
export default Header;

import { Link } from 'react-router-dom';
import logo from '../assets/stream-backer.png'
import Auth from '../utils/auth';

import Button from '@mui/material/Button'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div className='header-div'>
        <Link to="/">
          <img src={logo} alt='logo' className='logo'/>
        </Link>
        <div className='log-sign-btn-div'>
          {Auth.loggedIn() ? (
            <Button 
              variant='text'
              color='primary'
              onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Button 
                variant='contained'
                color='primary'
                component={Link}
                to="/login">
                Log in
              </Button>
              <Button 
                variant='text'
                color='secondary'
                component={Link}
                to="/signup">
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div>
        <Link to="/">
          <h1>
            Stream Backer
          </h1>
        </Link>
        <div>
          {Auth.loggedIn() ? (
            <button onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link 
                className='btn-link'
                to="/login">
                Login
              </Link>
              <Link 
                className='btn-link'
                to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

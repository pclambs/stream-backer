import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth'

import CustomTextField from '../components/CustomTextField'
import Button from '@mui/material/Button'

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error, data }] = useMutation(LOGIN_USER)

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    })
  }

  return (
    <main>
      <div>
        <div className="card">
          <h2>Log in</h2>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <div>
                <form onSubmit={handleFormSubmit}>
                  <CustomTextField
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    variant='outlined'
                    label='Email'
                    margin='normal'
                  />
                  <CustomTextField
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    variant='outlined'
                    label='Password'
                    margin='normal'
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    size='large'
                    sx={{
                      width: '100%',
                      marginTop: '1rem'
                    }}
                  >
                    Submit
                  </Button>
                </form>
                <div className="signup-link">
                  <p>
                    Don't have an account yet?{' '}
                    <Link to="/signup">
                      Sign up!
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div>
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login

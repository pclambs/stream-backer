import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_PROFILE } from '../utils/mutations'
import Auth from '../utils/auth'

import CustomTextField from '../components/CustomTextField'
import Button from '@mui/material/Button'


const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE)

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
      const { data } = await addProfile({
        variables: { ...formState },
      })

      Auth.login(data.addProfile.token)
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <main>
      <div className="card">
        <h2>Sign Up</h2>
        <div>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <CustomTextField
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
                variant='outlined'
                label='Username'
                margin='normal'
                />
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
          )}

          {error && (
            <div>
              {error.message}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Signup

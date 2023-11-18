// UserFrom.jsx
import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const UserForm = ({
  initialValue,
  onSubmit,
  onCancel,
}) => {
  const [userBody, setUserBody] = useState(initialValue);
console.log(initialValue)
  useEffect(() => {
    setUserBody(initialValue);
  }, [initialValue]);

  const handleInputChange = (e) => {
   const {name, value } = e.target
   setUserBody({
    ...userBody,
    [name]:value
   })
  }

  const submitUserBody = () => {
    if (!userBody) {
      return alert("Must include a comment");
    }

    onSubmit(userBody);
  };

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Container 
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        disableGutters
      >
        <Box 
          component="form" 
          noValidate 
          autoComplete="off"
        >
          {/* <pre>{JSON.stringify(userBody, null, 2)}</pre> */}
          <TextField
            margin="normal"
            label="Username"
            variant="outlined"
            name="username"
            value={userBody.username}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            label="Email"
            variant="outlined"
            name="email"
            value={userBody.email}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={userBody.password}
            autoComplete="current-password"
          />

          <TextField
            margin="normal"
            name="bio"
            label="Write your bio"
            value={userBody.bio}
            onChange={handleInputChange}
            multiline
            rows={3}
            helperText=""
          />

          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button variant="outlined" color="success" onClick={submitUserBody}>
              Submit
            </Button>
            {
              <Button variant="outlined" color="error" onClick={onCancel}>
                Cancel
              </Button>
            }
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default UserForm;

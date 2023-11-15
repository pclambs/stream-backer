// UserFrom.jsx
import React, { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";


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
    <Box component="form" noValidate autoComplete="off">
      <pre>{JSON.stringify(userBody, null, 2)}</pre>
      <TextField
        label="Username"
        variant="outlined"
        name="username"
        value={userBody.username}
        onChange={handleInputChange}
      />

      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={userBody.email}
        onChange={handleInputChange}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={userBody.password}
        autoComplete="current-password"
      />

      <TextField
        name="bio"
        label="Write your bio"
        value={userBody.bio}
        onChange={handleInputChange}
        multiline
        helperText=""
      />

      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" color="success" onClick={submitUserBody}>
          Submit
        </Button>
        {
          <Button variant="text" color="error" onClick={onCancel}>
            Cancel
          </Button>
        }
      </Box>
    </Box>
  );
};

export default UserForm;

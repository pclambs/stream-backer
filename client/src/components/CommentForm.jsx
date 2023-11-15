// CommentForm.jsx
import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardHeader, CardContent, Stack, Typography } from '@mui/material'
import CustomTextField from './CustomTextField'
import UserAvatar from "./UserAvatar"

const CommentForm = ({ initialValue, initialComment, onSubmit, onCancel, isEditing }) => {
  const [commentBody, setCommentBody] = useState(initialValue)

  useEffect(() => {
    setCommentBody(initialValue)
  }, [initialValue])

  const submitComment = () => {
    if (!commentBody) {
      return alert('Must include a comment')
    }

    onSubmit(commentBody)

  }


  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        sx={{
          borderBottom: 1,
          borderColor: "primary.main",
        }}
        avatar={
          <UserAvatar />
        }
        action={
          <Stack direction="row" spacing={1}>
            <Button 
              variant="outlined" 
              color="success" 
              onClick={submitComment}
            >
          Submit
            </Button>
          </Stack>
        }
        title="Add a comment"
        // subheader="Add a comment"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <Box 
            component="form"
                noValidate
                autoComplete="off"
            sx={{
              width: "100%"
            }}
          >
            <CustomTextField
							name="description"
              id="comment-input"
							type="text"
							value={commentBody}
							onChange={(e) => setCommentBody(e.target.value)}
							variant='standard'
							rows={4}
							multiline
							label='Add a comment'
              helperText=""
              sx={{
                width: "100%"
              }}
						/>
          </Box>
        </Typography>
      </CardContent>
    </Card>

    // <Box
    //   component="form"
    //   sx={{
    //     '& .MuiTextField-root': { m: 1, width: '25ch' },
    //   }}
    //   noValidate
    //   autoComplete="off"

    // >
    //     <Box
    //     sx={{
    //         textAlign: "center"
    //     }}>
    //   <TextField
    //     id="comment-input"
    //     label="Type your comment"
    //     value={commentBody}
    //     onChange={(e) => setCommentBody(e.target.value)}
    //     multiline
    //     helperText=""
    //   />
    //   </Box>

    //   <Box
    //     component= "div"
    //     sx={{
    //       display:'flex',

    //       justifyContent: "center",
    //       alignItems: "center"
    //     }}
    //   >
    //   <Button 
    //     variant="outlined" 
    //     color="success" 
    //     onClick={submitComment}
    //   >
    //     Submit
    //   </Button>
    //   {isEditing && (
    //   <Button 
    //     variant="text" 
    //     color="error" 
    //     onClick={onCancel}
    //   >
    //     Cancel
    //   </Button>)}
    //   </Box>
    // </Box>
  )
}

export default CommentForm

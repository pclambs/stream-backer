// CommentForm.jsx
import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardHeader, CardContent, Stack, Paper } from '@mui/material'
import CustomTextField from './CustomTextField'
import UserAvatar from "./UserAvatar"
import { format } from "date-fns"
import Auth from "../utils/auth"


const CommentForm = ({ initialValue, initialComment, onSubmit, closeForm, isEditing }) => {
  const [commentBody, setCommentBody] = useState(initialValue)

  useEffect(() => {
    setCommentBody(initialValue)
  }, [initialValue])

  const submitComment = () => {
    if (!commentBody) {
      return alert('Must include a comment')
    }
    onSubmit(commentBody)
    closeForm()
  }

  const username = Auth.getProfile()?.data?.username

  return (
    <Paper 
      elevation={2}
      sx={{ 
        width: "100%",
        marginBottom: ".5rem"
      }}
    >
      <CardHeader
        sx={{
          borderBottom: 1,
          borderColor: "primary.main",
          mx: ".5rem",
          px: "0px",
          py: ".5rem",
          '& .MuiCardHeader-avatar': {
            marginRight: '.5rem',
          },
        }}
        avatar={
          <UserAvatar />
        }
        action={
          <Stack 
            direction="row" 
            spacing={1}
            sx={{
              marginRight: "10px",
              transform: "translateY(5px)"
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="info"
              onClick={submitComment}
            >
              Submit
            </Button>
          </Stack>
        }
        title={username}
        subheader={format(Date.now(), "h:mm aaa")}
      />
      <CardContent
    
        sx={{
          "&:last-child": {
            paddingBottom: '1rem',
            paddingTop: '.5rem'
          },
          '& .MuiCardContent-root': {
            margin: '.5rem',
          },
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            width: "100%",

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
      </CardContent>
    </Paper>
  )
}

export default CommentForm

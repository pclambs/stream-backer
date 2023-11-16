// CommentForm.jsx
import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardHeader, CardContent, Stack, Typography } from '@mui/material'
import CustomTextField from './CustomTextField'
import UserAvatar from "./UserAvatar"
import { format } from "date-fns"
import Auth from "../utils/auth"


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

  const username = Auth.getProfile()?.data?.username


  return (
    <Card 
      sx={{ 
        width: "100%",
        marginBottom: "15px"
      }}
    >
      <CardHeader
        sx={{
          borderBottom: 1,
          borderColor: "primary.main",
          mx:"16px",
          px: "0px"
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
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default CommentForm

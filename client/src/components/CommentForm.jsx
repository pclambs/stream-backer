// CommentForm.jsx
import React, { useState, useEffect } from 'react'
import { Button, TextField, Box } from '@mui/material'

const CommentForm = ({ initialValue, onSubmit, onCancel, isEditing }) => {
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
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
        <Box
        sx={{
            textAlign: "center"
        }}>
      <TextField
        id="comment-input"
        label="Type your comment"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        multiline
        helperText=""
      />
      </Box>
    
      <Box
      component= "div"
      sx={{
        display:'flex',
       
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Button 
      variant="outlined" 
      color="success" 
      onClick={submitComment}>
        Submit
      </Button>
      {isEditing && <Button 
      variant="text" 
      color="error" 
      onClick={onCancel}>
        Cancel
      </Button>}
      </Box>

    </Box>
  )
}

export default CommentForm

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_COMMENT } from '../utils/mutations'
import { useParams } from 'react-router-dom'
import { Box, TextField, Button } from '@mui/material'

const mainColor = "secondary"

const CommentForm = () => {
  const { videoPostId } = useParams();
  const [commentBody, setCommentBody] = useState("Be Nice!")

  const [addComment] = useMutation(ADD_COMMENT)

  const submitComment = async () => {
    
      
      
      try {
        if (!commentBody) {
          return alert('Must include a comment')
        }

        const newComment = {
          commentBody,
          postedBy: "test",
          postedTo: videoPostId,
        }

        console.log(newComment)

        await addComment({
            variables: newComment,
      })

      setCommentBody('');
      alert('Comment submitted successfully!')
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
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
      <TextField
        id="comment-input"
        label="Type your comment"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        multiline
        helperText=""
      />
      <Button
        variant="text"
        color={mainColor}
        onClick={submitComment}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
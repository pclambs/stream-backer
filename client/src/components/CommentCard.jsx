// CommentCard.jsx
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_COMMENT, REMOVE_COMMENT } from '../utils/mutations';
import { Box, Button, TextField } from "@mui/material"
import CommentForm from './CommentForm'

const CommentCard = ({ comment }) => {
  const [updateComment] = useMutation(UPDATE_COMMENT)
  const [removeComment] = useMutation(REMOVE_COMMENT)

  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = async (updatedCommentBody) => {
    try {
      await updateComment({
        variables: {
            ...comment,
            commentBody: updatedCommentBody
        }
      })

      setIsEditing(false);
      alert('Comment updated!')
      setTimeout(() => {
        window.location.reload();
      }, 500)
    } catch (error) {
      console.error('Error updating comment:', error)
    }
  };

  const handleDelete = async () => {
    try {
      await removeComment({
        variables: { commentId: comment._id }
      });
      alert("Comment deleted successfully!")
      // Refreshes the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 500)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  };

  return (
    <div className="comment-card" sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
      {isEditing ? (
        <CommentForm
          initialValue={comment.commentBody}
          comment={comment}
          onSubmit={(updatedCommentBody) => handleUpdate(updatedCommentBody)}
          onCancel={() => setIsEditing(false)}
          isEditing={isEditing}
          
        />
      ) : (
        <>
         <Box
      component= "div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center" 
      }}>
      <h3>{comment.commentBody}</h3>
      <h4>Posted by: {comment.postedBy.username}</h4>
      </Box>
        <Box
      component= "div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center" 
      }}>
        
          <Button 
          variant="outlined" 
          color="success" 
          onClick={() => setIsEditing(true)}
          >Update
          </Button>
          <Button 
          id="deleteButton" 
          variant="contained" 
          color="error" 
          onClick={handleDelete}
          >Delete
          </Button>
        </Box>
        </>
      )}
    </div>
  )
}

export default CommentCard

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
          commentId: comment._id,
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
    <div className="comment-card">
      {isEditing ? (
        <CommentForm
          initialValue={comment.commentBody}
          onSubmit={(updatedCommentBody) => handleUpdate(updatedCommentBody)}
          onCancel={() => setIsEditing(false)}
          isEditing={isEditing}
        />
      ) : (
        <>
          <h3>{comment.commentBody}</h3>
          <h4>Posted by: {comment.postedBy.username}</h4>
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
        </>
      )}
    </div>
  )
}

export default CommentCard

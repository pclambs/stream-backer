// CommentContainer.jsx
import React, { useState } from 'react'
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import { Button } from '@mui/material'

const CommentContainer = ({ comments }) => {
  const [isEditingForm, setIsEditingForm] = useState(false)

  const handlePostCommentClick = () => {
    setIsEditingForm(true)
  }

  const handleCancelClick = () => {
    setIsEditingForm(false)
  }

  return (
    <div className="comment-container">
      {!isEditingForm && (
        <Button 
        variant="text" 
        color="primary" 
        onClick={handlePostCommentClick}>
          Post A Comment
        </Button>
      )}
      {isEditingForm && (
        <>
          <CommentForm 
          setIsEditingForm={setIsEditingForm}
            />
          <Button 
          variant="outlined" 
          color="error" 
          onClick={handleCancelClick}
          >Cancel
          </Button>
        </>
      )}
      {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </div>
  )
}

export default CommentContainer

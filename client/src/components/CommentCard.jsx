//Card for displaying an individual comment

// TODO get username instead of profileID for comment.postedBy

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_COMMENT, REMOVE_COMMENT } from '../utils/mutations'

import { Box, Button, TextField } from "@mui/material"



const CommentCard = ({ comment }) => {
    console.log(comment)

    const [updateComment] = useMutation(UPDATE_COMMENT)
    const [removeComment] = useMutation(REMOVE_COMMENT)

    const [isEditing, setIsEditing] = useState(false)
    const [updatedCommentBody, setUpdatedCommentBody] = useState(comment.commentBody)

    const handleUpdate = async () => {

        try {

            await updateComment({
                variables: {
                    commentId: comment._id,
                    commentBody: updatedCommentBody
                }
            })

            setIsEditing(false)
            alert('Comment updated!')
            setTimeout(() => {
                window.location.reload()
            }, 500)
        }
        catch (error) {
            console.error('Error updating comment:', error)
        }
    }


    const handleDelete = async () => {

        try {
            await removeComment({
                variables: { commentId: comment._id }
            })
            alert("Comment deleted successfully!")
            //refreshes the page after 2 seconds
            setTimeout(() => {
                window.location.reload()
            }, 500)
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }

    return (
        <div className="comment-card">
            {isEditing ? (
                <>
                    <TextField
                        id="updated-comment-input"
                        label="Updated comment"
                        value={updatedCommentBody}
                        onChange={(e) => setUpdatedCommentBody(e.target.value)}
                        multiline
                    />
                    <Button variant="contained" color="success" onClick={handleUpdate}>
                        Save
                    </Button>
                    <Button variant="text" onClick = {() => setIsEditing(false)}>
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    <h3>{comment.commentBody}</h3>
                    <h4>Posted by: {comment.postedBy.username}</h4>
                    <Button variant="outlined" color="success" onClick={() => setIsEditing(true)}>
                        Update
                    </Button>
                    <Button id="deleteButton" variant="contained" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                </>
            )}
        </div>
    )
}


export default CommentCard
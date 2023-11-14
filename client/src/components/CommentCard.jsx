//Card for displaying an individual comment

// TODO get username instead of profileID for comment.postedBy

import React from 'react'
import { useMutation } from '@apollo/client'
import {UPDATE_COMMENT, REMOVE_COMMENT} from '../utils/mutations'

import {Box, Button} from "@mui/material"



const CommentCard = ({comment}) => {
    console.log(comment)

    const [updateComment] = useMutation(UPDATE_COMMENT)
    const [removeComment] = useMutation(REMOVE_COMMENT)
    
    const handleUpdate = () => {}
    
    
    const handleDelete = async () => {
        
        try {
            await removeComment({
                variables: {commentId: comment._id}
        })
        alert("Removed successfully!")
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
           
            <h3>{comment.commentBody}</h3>
            <h4>Posted by: {comment.postedBy.username}</h4>

            <Button
            variant='outlined'
            color="success"
            onClick={() => alert('click')}
            >Update</Button>

            <Button
            id="deleteButton"
            variant= 'contained'
            color= "error"
            onClick={handleDelete}
            >Delete</Button>

        </div>
    )
}

export default CommentCard
// CommentContainer.jsx
import React, { useState } from 'react'
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import { Button, Box, Container } from '@mui/material'
import { useMutation } from '@apollo/client'
import { ADD_COMMENT } from '../utils/mutations'
import { useParams } from "react-router-dom"

import Auth from "../utils/auth"


const CommentContainer = ({ comments }) => {
    const [isEditingForm, setIsEditingForm] = useState(false)
    const [addComment] = useMutation(ADD_COMMENT)
    const { videoPostId } = useParams()
    const loggedInUserId = Auth.getProfile()?.data?._id

    const handlePostCommentClick = () => {
        setIsEditingForm(true)
    }

    const handleCancelClick = () => {
        setIsEditingForm(false)
    }

    const handleCommentSubmit = async (newCommentBody) => {
        // TODO push comment to VidoPost comments array


        //creats new comment object
        const newComment = {
            commentBody: newCommentBody,
            postedTo: videoPostId,
            postedBy: loggedInUserId
        }

        try {
            await addComment({
                variables: newComment
            })
            //TODO replace alert with better option
            alert('Comment Added!')
            //TODO replace this with better option
            setTimeout(() => {
                window.location.reload();
            }, 500)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container
            component="div"
            className="comment-container"
            disableGutters
        >
            
            {!isEditingForm && loggedInUserId && (
                <Button
                    variant="text"
                    color="primary"
                    onClick={handlePostCommentClick}
                    sx={{
                        margin: "9px"
                    }}
                >
                    Add a Comment
                </Button>
            )}
            {isEditingForm && (
                <>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={handleCancelClick}
                        sx={{
                            margin: "9px"
                        }}
                    >Cancel
                    </Button>
                    <CommentForm
                        setIsEditingForm={setIsEditingForm}
                        onSubmit={handleCommentSubmit}
                    />
                </>
            )}
            {comments.map((comment, index) => (
                <CommentCard
                    key={index}
                    comment={comment}
                />
            ))}
        </Container>
    )
}

export default CommentContainer

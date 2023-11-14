// CommentContainer.jsx
import React, { useState } from 'react'
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import { Button, Box } from '@mui/material'
import { useMutation } from '@apollo/client'
import { ADD_COMMENT } from '../utils/mutations'
import { QUERY_SINGLE_VIDEOPOST } from "../utils/queries"
import {useParams} from "react-router-dom"
import { useQuery } from '@apollo/client'


const CommentContainer = ({ comments }) => {
    const [isEditingForm, setIsEditingForm] = useState(false)
    const [addComment] = useMutation(ADD_COMMENT)
    const {videoPostId} = useParams()

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
            postedBy: "6552afe79eb1af3406b013b3",
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
        <Box
            component="div"
            className="comment-container"
            textAlign="center">
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
                        onSubmit={handleCommentSubmit}
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
                <CommentCard
                    key={index}
                    comment={comment}
                />
            ))}
        </Box>
    )
}

export default CommentContainer

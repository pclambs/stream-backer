// CommentContainer.jsx
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from "react-router-dom"
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import { ADD_COMMENT } from '../utils/mutations'
import { QUERY_COMMENTS } from '../utils/queries'
import { Button, Box, Container } from '@mui/material'

import Auth from "../utils/auth"

const CommentContainer = ({ comments }) => {
    const [isEditingForm, setIsEditingForm] = useState(false)
    const [addComment] = useMutation(ADD_COMMENT)
    const { videoPostId } = useParams()
    const loggedInUserId = Auth.getProfile()?.data?._id

    const { loading, error, data } = useQuery(QUERY_COMMENTS, {
        variables: { videoPostId }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const commentsData = data?.comments || comments || []

    const handlePostCommentClick = () => {
        setIsEditingForm(true)       
    }

    const closeForm = () => {
        setIsEditingForm(false)
    }

    const handleCommentSubmit = async (newCommentBody) => {
        const newComment = {
            commentBody: newCommentBody,
            postedTo: videoPostId,
            postedBy: loggedInUserId
        }

        try {
            await addComment({
                variables: newComment,
                // Update cache if needed to reflect the new comment
                update: (cache, { data: { addComment } }) => {
                    const existingComments = cache.readQuery({
                        query: QUERY_COMMENTS,
                        variables: { videoPostId },
                    });

                    cache.writeQuery({
                        query: QUERY_COMMENTS,
                        variables: { videoPostId },
                        data: {
                            comments: [...existingComments.comments, addComment],
                        },
                    })
                },
            })

            // alert('Comment Added!')
            closeForm()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container
            component="div"
            className="comment-container"
            disableGutters
            comments={data?.comments || []}
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
                        onClick={closeForm}
                        sx={{
                            margin: "9px"
                        }}
                    >Cancel
                    </Button>
                    <CommentForm
                        setIsEditingForm={setIsEditingForm}
                        onSubmit={handleCommentSubmit}
                        closeForm={closeForm}
                    />
                </>
            )}
            {commentsData.map((comment, index) => (
                <CommentCard
                    key={index}
                    comment={comment}
                />
            ))}
        </Container>
    )
}

export default CommentContainer

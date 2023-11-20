// CommentCard.jsx
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_COMMENT, REMOVE_COMMENT } from '../utils/mutations';
import { Box, Stack, Typography, Card, Paper, CardHeader, CardContent, Tooltip, IconButton } from "@mui/material"
import CommentForm from './CommentForm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { getRelativeTime } from "../utils/helpers"
import Auth from "../utils/auth"
import ProfileAvatar from './ProfileAvatar'
import { QUERY_COMMENTS } from '../utils/queries'

const CommentCard = ({ comment }) => {
  // console.log(comment)
  const { postedBy } = comment

  const [updateComment] = useMutation(UPDATE_COMMENT)
  const [removeComment] = useMutation(REMOVE_COMMENT)
  const [isEditing, setIsEditing] = useState(false)

  const isLoggedIn = Auth.loggedIn()
  const commentId = postedBy?._id
  const loggedInUserId = isLoggedIn ? Auth.getProfile()?.data?._id : null
  const isMyComment = commentId === loggedInUserId

  const relativeTime = getRelativeTime(comment.createdAt)

  const handleUpdate = async (updatedCommentBody) => {
    try {

      const newComment = {
        ...comment,
        commentId: comment._id,
        commentBody: updatedCommentBody
      }

      await updateComment({
        variables: newComment
      })
      //closes the update form
      setIsEditing(false)

    } catch (error) {
      console.error('Error updating comment:', error)
    }
  };

  const handleDelete = async () => {
    try {
      await removeComment({
        variables: { commentId: comment._id },
        update: (cache) => {
          // read existing comments from the cache
          const existingComments = cache.readQuery({
            query: QUERY_COMMENTS,
            variables: { videoPostId: comment.postedTo },
          })
  
          // remove deleted comment from the existing comments
          const updatedComments = existingComments.comments.filter(
            (c) => c._id !== comment._id
          )
  
          // write updated comments back to the cache
          cache.writeQuery({
            query: QUERY_COMMENTS,
            variables: { videoPostId: comment.postedTo },
            data: {
              comments: updatedComments,
            },
          })
        },
      })
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  return (
    <Box
      component="div"
      className="comment-card"
      sx={{
        // '& .MuiTextField-root': { m: 1, width: '25ch' },
        marginBottom: ".5rem",
        width: "100%"
      }}>
      {isEditing && isLoggedIn ? (
        <CommentForm
          initialValue={comment.commentBody}
          comment={comment}
          onSubmit={(updatedCommentBody) => handleUpdate(updatedCommentBody)}
          onCancel={() => setIsEditing(false)}
          isEditing={isEditing}

        />
      ) : (
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            padding: '0'
          }}
        >
          <CardHeader
            sx={{
              borderBottom: 1,
              borderColor: "primary.main",
              mx: ".5rem",
              px: "0px",
              py: ".5rem",
              '& .MuiCardHeader-avatar': {
                marginRight: '.5rem',
              },
              '& .MuiCardHeader-subheader': {
                color: '#808080'
              },
            }}
            avatar={
              <Tooltip
                title={postedBy.username}
                PopperProps={{
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -7], // X, Y
                      },
                    },
                  ],
                }}
              >
                <ProfileAvatar profile={postedBy} />
              </Tooltip>
            }
            action={
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  marginRight: "8px",
                  transform: "translateY(5px)"
                }}
              >
                {isMyComment &&
                  <>
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() => setIsEditing(true)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      id="deleteButton"
                      color="info"
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              </Stack>
            }
            title={postedBy.username}
            subheader={relativeTime}
          />
          <CardContent 
            sx={{
              padding: '1rem',
              "&:last-child": {
                paddingBottom: '.75rem'
              }
            }}>
            <Typography component="p" variant="body2" color="white" p={0}>
              {comment.commentBody}
            </Typography>
          </CardContent>
        </Paper>
      )}
    </Box>
  )
}

export default CommentCard

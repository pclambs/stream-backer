// CommentCard.jsx
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_COMMENT, REMOVE_COMMENT } from '../utils/mutations';
import { Box, Stack, Typography, Card, CardHeader, CardContent, Tooltip, IconButton } from "@mui/material"
import CommentForm from './CommentForm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatDistanceToNow } from "date-fns"
import Auth from "../utils/auth"
import ProfileAvatar from './ProfileAvatar'

const CommentCard = ({ comment }) => {
  console.log(comment)
  const [updateComment] = useMutation(UPDATE_COMMENT)
  const [removeComment] = useMutation(REMOVE_COMMENT)
  const [isEditing, setIsEditing] = useState(false)

  const isLoggedIn = Auth.loggedIn()
  // const username = Auth.getProfile()?.data?.username;
  const { postedBy } = comment

  const timestamp = Number(comment.createdAt)
  const date = new Date(timestamp)
  const relativeTime = formatDistanceToNow(date, { addSuffix: true })

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
        variables: { commentId: comment._id }
      });
      //TODO replace alert with ebtter option
      alert("Comment deleted successfully!")
      // Refreshes the page after 2 seconds
      //TODO replace this with better option
      setTimeout(() => {
        window.location.reload();
      }, 500)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  };
  
  return (
    <Box
      component="div"
      className="comment-card"
      sx={{
        // '& .MuiTextField-root': { m: 1, width: '25ch' },
        marginBottom: "20px",
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
        <Card sx={{ width: "100%" }}>
          <CardHeader
            sx={{
              borderBottom: 1,
              borderColor: "primary.main",
              mx:"16px",
              px: "0px"
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
                <ProfileAvatar profile={postedBy}/>
              </Tooltip>
            }
            action={
              <Stack 
                direction="row" 
                spacing={1}
                sx={{
                  marginRight: "10px",
                  transform: "translateY(5px)"
                }}
              >
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
              </Stack>
            }
            title={comment.postedBy.username}
            subheader={relativeTime}
          />
          <CardContent>
            <Typography component="p" variant="body2" color="text.secondary">
              {comment.commentBody}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default CommentCard

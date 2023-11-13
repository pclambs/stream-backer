//Card for displaying an individual comment

// TODO get username instead of profileID for comment.postedBy

import React from 'react'

const CommentCard = ({comment}) => {
    return (
        <div className="comment-card">
            <h3>{comment.commentBody}</h3>
            <h4>Posted by: {comment.postedBy.username}</h4>
           
        </div>
    )
}

export default CommentCard
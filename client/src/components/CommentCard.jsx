//Card for displaying an individual comment

import React from 'react'

const CommentCard = ({comment}) => {
    return (
        <div className="card comment-card">
            <h3>{comment.commentBody}</h3>
            <h4>{comment.postedBy.username}</h4>
            <p>{comment.dateCreated}</p>
        </div>
    )
}

export default CommentCard
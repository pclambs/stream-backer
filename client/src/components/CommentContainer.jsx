//Displays video comments
//Displays "Submit Comment" or "login now" depending on login status
//Contains CommentCards

import CommentCard from "./CommentCard"

const CommentContainer = ({comments}) => {


    return (
        <div className="container comment-container">

            {comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
            ))}
        </div>
    )
}

export default CommentContainer
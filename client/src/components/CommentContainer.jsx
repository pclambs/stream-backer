

import CommentCard from "./CommentCard.jsx"
import CommentForm from "./CommentForm.jsx"



const CommentContainer = ({comments}) => {

    return (
        <div className="comment-container">
            <CommentForm />
            {comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
            ))}
           
        </div>
    )
}

export default CommentContainer
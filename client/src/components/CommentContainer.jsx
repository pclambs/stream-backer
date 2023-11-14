//Displays video comments
//Displays "Submit Comment" or "login now" depending on login status
//Contains CommentCards

import CommentCard from "./CommentCard.jsx"



import CommentForm from "./CommentForm.jsx"

const CommentContainer = ({comments}) => {

    // returns an array of CommentCards populated with comment data
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
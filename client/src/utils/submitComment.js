import {useMutation} from '@apollo/client'
import { ADD_COMMENT } from './mutations'
import {useLocation, useParams} from 'react-router-dom'

const {videoPostId} = useParams()

export default submitComment = () => {
    const commentBody = document.querySelector('#comment-input').value
    const postedBy = "test"
    const postedTo = videoPostId

    if (!commentBody) {
        return alert('Must include a value')
    }

    const newComment = {
        commentBody,
        postedBy,
        postedTo
    }

    useMutation(ADD_COMMENT, newComment)

}
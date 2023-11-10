import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      username
      email
      password
      uploadedVideos
    }
}
`

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      username
      email
      password
      uploadedVideos
    }
}
`
export const QUERY_VIDEOPOSTS = gql`
  query allVideoPosts {
    videoPosts {
      _id
      createdAt
      description
      postedBy
      thumbnail
      title
      videoSRC
    }
}
`

export const QUERY_SINGLE_VIDEOPOST = gql`
  query singleVideoPost($videoPostId: ID!) {
    videoPost(videoPostId: $videoPostId) {
      _id
      createdAt
      description
      postedBy
      thumbnail
      title
      videoSRC
    }
}
`

export const QUERY_COMMENTS = gql`
  query allComments($videoPostId: ID) {
    comments(videoPostId: $videoPostId) {
      _id
      commentBody
      postedBy
      postedTo
    }
}
`
import { gql } from '@apollo/client'

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      createdAt
      username
      email
      bio
      uploadedVideos {
        _id
        createdAt
        title
        description
        thumbnail
        videoSRC
        postedBy {
          _id
          username
        }
      }
    }
  }
`

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      createdAt
      username
      email
      bio
      uploadedVideos {
        _id
        title
        description
        thumbnail
        videoSRC
        createdAt
        postedBy {
          _id
          username
        }
      }
    }
  }
`

export const QUERY_VIDEOPOSTS = gql`
  query allVideoPosts {
    videoPosts {
      _id
      createdAt
      description
      thumbnail
      title
      videoSRC
      postedBy {
        _id
        username
      }
      comments {
        _id
        commentBody
        createdAt
        postedBy {
          _id
          username
        }
      }
    }
  }
`

export const QUERY_SINGLE_VIDEOPOST = gql`
  query singleVideoPost($videoPostId: ID!) {
    videoPost(videoPostId: $videoPostId) {
      _id
      createdAt
      description
      thumbnail
      title
      videoSRC
      postedBy {
        _id
        username
      }
      comments {
        _id
        commentBody
        createdAt
        postedTo
        postedBy {
          _id
          username
        }
      }
    }
  }
`

export const QUERY_COMMENTS = gql`
  query allComments($videoPostId: ID) {
    comments(videoPostId: $videoPostId) {
      _id
      commentBody
      createdAt
      postedTo
      postedBy {
        _id
        username
      }
    }
  }
`
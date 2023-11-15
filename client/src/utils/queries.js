import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      username
      email
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
      uploadedVideos {
        _id
        title
        description
        thumbnail
        postedBy {
          _id
        }
        videoSRC
        createdAt
      }
    }
  }
`;
export const QUERY_VIDEOPOSTS = gql`
  query allVideoPosts {
    videoPosts {
      _id
      createdAt
      description
      postedBy {
        _id
        username
      }
      thumbnail
      title
      videoSRC
      comments {
        _id
        commentBody
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

      postedBy {
        _id
        username
      }

      thumbnail
      title
      videoSRC

      comments {
        _id
        commentBody

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
      postedBy {
        _id
        username
      }
      postedTo
    }
}
`
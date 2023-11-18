import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        createdAt
        username
        email
      }
    }
  }
`

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
        profile {
        _id
        createdAt
        username
        email
      }
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation updateProfile($profileId: ID!, $username: String, $email: String, $password: String, $bio: String) {
    updateProfile(profileId: $profileId, username: $username, email: $email, password: $password, bio: $bio) {
        _id
        createdAt
        username
        email
        bio
      }
  }
`

export const REMOVE_PROFILE = gql`
  mutation removeProfile($profileId: ID!) {
    removeProfile(profileId: $profileId) {
      token
        profile {
        _id
        createdAt
        username
        email
      }
    }
  }
`

export const ADD_VIDEO_POST = gql`
  mutation addVideoPost($title: String!, $thumbnail: String!, $postedBy: ID!, $videoSrc: String!, $description: String) {
    addVideoPost(title: $title, thumbnail: $thumbnail, postedBy: $postedBy, videoSRC: $videoSrc, description: $description) {
      _id
      title
      description
      videoSRC
      createdAt
      thumbnail
      postedBy {
        _id
      }
    }
  }
`

export const UPDATE_VIDEO_POST = gql`
  mutation updateVideoPost($videoPostId: ID!, $title: String, $description: String, $thumbnail: String, $videoSRC: String) {
    updateVideoPost(videoPostId: $videoPostId, title: $title, description: $description, thumbnail: $thumbnail, videoSRC: $videoSRC) {
      _id
      title
      description
      videoSRC
      postedBy 
      createdAt
      thumbnail
    }
  }
`

export const REMOVE_VIDEO_POST = gql`
  mutation removeVideoPost($videoPostId: ID!) {
    removeVideoPost(videoPostId: $videoPostId) {
      _id
      title
      description
      videoSRC
      postedBy
      createdAt
      thumbnail
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment($commentBody: String!, $postedBy: ID!, $postedTo: ID!) {
    addComment(commentBody: $commentBody, postedBy: $postedBy, postedTo: $postedTo) {
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

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $commentBody: String) {
    updateComment(commentId: $commentId, commentBody: $commentBody) {
      _id
      commentBody
      createdAt
    }
  }
`

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
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
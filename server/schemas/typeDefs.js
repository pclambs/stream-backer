import { gql } from "@apollo/server"

const typeDefs = gql`
  type Profile {
    _id: ID
    username: String!
    email: String!
    password: String!
    uploadedVideos: [ID]!
  }

  type VideoPost {
    _id: ID
    title: String!
    description: String
    thumbnail: String!
    postedBy: String
    videoSRC: String!
    createdAt: String
  }

  type Comment {
    _id: ID
    commentBody: String!
    postedBy: ID
    postedTo: ID
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    videoPosts(profileId: ID): [VideoPost]!
    videoPost(videoPostId: ID!): VideoPost
    comments(videoPostId: ID): [Comment]!
    #comment(commentId: ID!): Comment
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    
    login(email: String!, password: String!): Auth

    addVideoPost(title: String!, description: String, thumbnail: String!, postedBy: ID!, videoSRC: String!): VideoPost

    removeVideoPost(videoPostId: ID!): VideoPost

    addComment(commentBody: String!, postedBy: ID!, postedTo: ID!): Comment

    removeComment(commentId: ID!): Comment
    
    removeProfile(profileId: ID!): Profile
  }
`

module.exports = typeDefs

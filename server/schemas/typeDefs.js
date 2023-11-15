const typeDefs = `
  scalar Upload

  type Profile {
    _id: ID
    username: String!
    email: String!
    uploadedVideos: [VideoPost]!
    bio: String
  }

  type VideoPost {
    _id: ID
    title: String!
    description: String
    thumbnail: String!
    postedBy: Profile!
    videoSRC: String!
    createdAt: String!
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentBody: String!
    postedBy: Profile
    postedTo: ID
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type FileResponse {
    url: String
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    videoPosts(profileId: ID): [VideoPost]!
    videoPost(videoPostId: ID!): VideoPost
    comments(videoPostId: ID): [Comment]!
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth

    removeProfile(profileId: ID!): Profile
    
    login(email: String!, password: String!): Auth

    addVideoPost(title: String!, description: String, thumbnail: String!, postedBy: ID!, videoSRC: String!): VideoPost

    removeVideoPost(videoPostId: ID!): VideoPost

    addComment(commentBody: String!, postedBy: ID!, postedTo: ID!): Comment

    removeComment(commentId: ID!): Comment

    updateProfile(profileId: ID!, username: String, email: String, password: String, bio: String): Profile

    updateVideoPost(videoPostId: ID!, title: String, description: String, thumbnail: String, videoSRC: String): VideoPost

    updateComment(commentId: ID!, commentBody: String): Comment

    uploadVideo(file: Upload!): String
  }
`

module.exports = typeDefs

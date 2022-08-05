const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    username: String
    email: String
    city: String
    state: String
    breed: String
    characteristics:[Characteristic]
    favoriteTreat: String
    image: String
    favoriteUsers: [User]
  }

type Query{
    me: User
    users: [User]
}


type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveFav(input: favoriteUsers!): User
    removeFav(_id: ID!): User
}

`;



module.exports = typeDefs;
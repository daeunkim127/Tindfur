const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    name: String
    email: String
    city: String
    state: String
    breed: String
    characteristics:[String]
    favoriteTreat: String
    image: String
    favoriteUsers: [Favorite]
      
}

type Favorite {
    id: ID!
    name: String
}

type Query{
    user(id: ID): User
}


type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveFav(_id: ID!): User
    removeFav(_id: ID!): User
}

`;



module.exports = typeDefs;
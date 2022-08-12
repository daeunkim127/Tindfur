import { gql } from '@apollo/client';


export const GET_ME = gql`
  query getMe{
      me {
        _id
        name
        email
        savedDogs {
          id
          email
          city
          state
          breed
          age
          gender
          about
          image
          characteristics
          name
          favoriteTreat
        }
     }
  }
`;

export const GET_ALL =gql`
  query getAll {
    users{
          _id
          email
          city
          state
          breed
          age
          gender
          about
          image
          characteristics
          name
          favoriteTreat
          }
  }
`
  
import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      dogCount
      savedDogs {
        city
        state
        breed
        dogId
        age
        gender
        about
        image
        characteristics
        name
        favorite_treat
      }
    }
  }
`;
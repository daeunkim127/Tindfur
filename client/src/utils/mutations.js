import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;


export const ADD_USER = gql`
mutation addUser($name: String!, $email: String!, $password: String!, $city: String!, $state: String!, $breed: String!, $age: String!, $gender: String!, $characteristics: String!, $favoriteTreat: String!) {
  addUser(name: $name, email: $email, password: $password, city: $city, state: $state, breed: $breed, age: $age, gender: $gender, characteristics: $characteristics, favoriteTreat: $favoriteTreat) {
    token
    user {
      _id
      name
    }
  }
}
`;

export const SAVE_DOG = gql`
  mutation saveDog($id: ID!) {
    saveDog(id: $id) {
      name
      email
      savedDogs {
        city
        state
        breed
        id
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

export const REMOVE_DOG = gql`
  mutation removeDog($id:ID!) {
    removeDog(id: $id) {
      name
      email
      savedDogs {
        city
        state
        breed
        id
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

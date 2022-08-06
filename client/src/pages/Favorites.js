import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_DOG } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeDogId } from '../utils/localStorage';

const SavedDogs = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deleteDog] = useMutation(REMOVE_DOG);
  const userData = data?.me || {};

  if(!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleDeleteDog = async (dogId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteDog({
        variables: {dogId: dogId},
        update: cache => {
          const data = cache.readQuery({ query: GET_ME });
          const userDataCache = data.me;
          const savedDogsCache = userDataCache.savedDogs;
          const updatedDogCache = savedDogsCache.filter((dog) => dog.dogId !== dogId);
          data.me.savedDogs = updatedDogCache;
          cache.writeQuery({ query: GET_ME , data: {data: {...data.me.savedDogs}}})
        }
      });
      // upon success, remove book's id from localStorage
      removeDogId(dogId);
    } catch (err) {
      console.error(err);
    }
  };
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing your Favorite Dogs!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedDogs.length
            ? `Viewing ${userData.savedDogs.length} saved ${userData.savedDogs.length === 1 ? 'dog' : 'dogs'}:`
            : 'You have no saved dogs!'}
        </h2>
        <CardColumns>
          {userData.savedDogs.map((dog) => {
            return (
              <Card key={dog.dogId} border='dark'>
                {dog.image ? <Card.Img src={dog.image} alt={`The photo of ${dog.name}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{dog.name}</Card.Title>
                  <p className='small'>Location: {dog.city}, {dog.state}</p>
                  <Card.Text>Breed: {dog.breed}</Card.Text>
                  <Card.Text>Age: {dog.age}</Card.Text>
                  <Card.Text>Gender: {dog.gender}</Card.Text>
                  <Card.Text>About: {dog.about}</Card.Text>
                  <Card.Text>Characteristics: {[dog.characteristics]}</Card.Text>
                  <Card.Text>Favorite Treat: {dog.treat}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteDog(dog.dogId)}>
                    Delete {dog.name}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedDogs;
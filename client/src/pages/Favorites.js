import React from 'react';
import { Jumbotron, Container, Col, Card,Row, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_DOG } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeDogId } from '../utils/localStorage';

const SavedDogs = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deleteDog] = useMutation(REMOVE_DOG);
  const userData = data.me

  if(!userData) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleDeleteDog = async (dogId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(dogId)
    if (!token) {
      return false;
    }

    try {
      await deleteDog({
        variables: {id: dogId},
        update: cache => {
          const data = cache.readQuery({ query: GET_ME });
          console.log('here',data)
          const userDataCache = data.me;
          const savedDogsCache = userDataCache.savedDogs;
          const updatedDogCache = savedDogsCache.filter((dog) => dog.id !== dogId);
          data.me.savedDogs = updatedDogCache;
          cache.writeQuery({ query: GET_ME , data: {data: {...data.me.savedDogs}}})
        }
      });
      
      removeDogId(dogId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
    <br />
      <Jumbotron fluid className='text-light bg-dark'>
        
        <Container className='text-center'>
          <h1>Viewing your Favorite Dogs!</h1>
        </Container>
      </Jumbotron>
      <br />
      <Container className='text-center'>
        <h3>
         
          {userData.savedDogs.length
            ? `Viewing ${userData.savedDogs.length} saved ${userData.savedDogs.length === 1 ? 'dog' : 'dogs'}:`
            : 'You have no saved dogs!'}
        </h3>
        <br/>
        <Container >
          <Row>
          {userData.savedDogs.map((dog) => {
            return (
              <Col xs={12} sm={12} md={6} lg={4}>
              <Card key={dog.dogId} border='dark' >
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
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteDog(dog.id)}>
                    Delete {dog.name}
                  </Button>
                </Card.Body>
              </Card>
              </Col>
            );
          })}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default SavedDogs;
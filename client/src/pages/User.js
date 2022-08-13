import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Button, Row, Col, Card, CardColumns } from 'react-bootstrap';
import homepageImg from '../images/homepage.jpg'
import Auth from '../utils/auth';
// // import {} from '../utils/API';
import { saveDogIds, getFavoriteUsers } from '../utils/localStorage'; // needs modification, you want to render the dog options to the homepage upon login.
import { useQuery , useMutation} from '@apollo/react-hooks';
import { SAVE_DOG} from '../utils/mutations';
import { GET_ME, GET_ALL} from '../utils/queries';
const User = () => {

  const { data: userData, error: errorR, loading: landingR } = useQuery(GET_ALL);
  const { data:userProfile, error, loading } = useQuery(GET_ME);
 
  const allUsers = userData?.users || {};
  const profile = userProfile?.me || {};
  console.log(allUsers);
  console.log(profile);
  const [saveDog]=useMutation(SAVE_DOG)
  const handleSaveDog = async (dogId) => {
        // find the dog in `allUsers` state by the matching id
        const dogToSave = allUsers.find((dog) => dog.dogId === dogId); // should most likely change to an on click function
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }
        try {
          await saveDog({
            variables: {id: dogId},
            update: cache => {
              const {me} = cache.readQuery({ query: GET_ME });
              
              cache.writeQuery({ query: GET_ME , data: {me: { ...me, savedDogs: [...me.savedDogs, dogToSave] } } })
            }
          });
       
          saveDogIds([dogId]);
        } catch (err) {
          console.error(err);
        }
      };

  if (loading) {
    return <h2>LOADING...</h2>;

  }    return (
        <>
        <br />
          <Jumbotron fluid className='text-light bg-dark'>
            <Container className='text-center'>
              <h1>Find Dog Love Here</h1>
            </Container>
          </Jumbotron>
          <Container className='text-center'>
            <h3>
                {allUsers.length
                  ? `You are currently viewing ${allUsers.length} results:`
                  : 'Click the heart icon to save your Favorites!'}
            </h3>
            <Container>
              <Row>
                {allUsers.map((dog)=>{
                    return(
                      <Col xs={12} sm={12} md={6} lg={4}>
                        <Card key={dog._id} border='dark' >
                          {dog.image ? <Card.Img src={dog.image} alt={`The photo of ${dog.name}`}/>:null}
                          <Card.Body>
                            <Card.Title>{dog.name}</Card.Title>
                              <p className='small'>Location: {dog.city}, {dog.state}</p>
                            <Card.Text>Breed: {dog.breed}</Card.Text>
                            <Card.Text>Age: {dog.age}</Card.Text>
                            <Card.Text>Gender: {dog.gender}</Card.Text>
                            <Card.Text>About: {dog.about}</Card.Text>
                            <Card.Text>Characteristics: {dog.characteristics}</Card.Text>
                            <Card.Text>Favorite Treat: {dog.favoriteTreat}</Card.Text>
                            {Auth.loggedIn() && (
                             <Button className='btn-block btn-danger' onClick={() => handleSaveDog(dog._id)}>
                             Add {dog.name}
                           </Button>
                      )}
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
}
export default User;

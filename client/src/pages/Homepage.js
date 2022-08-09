import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
// import {} from '../utils/API';
import { saveDogIds, getSavedDogIds } from '../utils/localStorage'; // needs modification, you want to render the dog options to the homepage upon login.
import { useMutation } from '@apollo/react-hooks';
import {SAVE_DOG} from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { searchGoogleBooks } from '../utils/API';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

// import whole navbar instead 
import Navbar from '../components/Navbar'

const Homepage  = () => {
    return (
        <>
        <Navbar />
          <Container>
            <h1>Everyone deserves love, even Dogs!</h1>
          </Container>
          <Jumbotron>
            <Container>
              <Image src="../../public/homepage.jpg" rounded />
            </Container>
          </Jumbotron>
            
        </>
    )

};

export default Homepage;
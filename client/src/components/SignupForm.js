import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    state: "",
    breed: "",
    age: "",
    gender: "",
    about: "",
    characteristics: [],
    favorite_treat: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // define mutation for adding a user
  const [createUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
      city: "",
      state: "",
      breed: "",
      age: "",
      gender: "",
      about: "",
      characteristics: [],
      favorite_treat: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="city">City</Form.Label>
          <Form.Control
            type="city"
            placeholder="Your city"
            name="city"
            onChange={handleInputChange}
            value={userFormData.city}
            required
          />
          <Form.Control.Feedback type="invalid">
            City is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="state">State</Form.Label>
          <Form.Control
            type="state"
            placeholder="Your state"
            name="state"
            onChange={handleInputChange}
            value={userFormData.state}
            required
          />
          <Form.Control.Feedback type="invalid">
            State is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="breed">Breed</Form.Label>
          <Form.Control
            type="breed"
            placeholder="Your breed"
            name="breed"
            onChange={handleInputChange}
            value={userFormData.breed}
            required
          />
          <Form.Control.Feedback type="invalid">
            Breed is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="age">Age</Form.Label>
          <Form.Control
            type="age"
            placeholder="Your age"
            name="age"
            onChange={handleInputChange}
            value={userFormData.age}
            required
          />
          <Form.Control.Feedback type="invalid">
            Age is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="Gender">Gender</Form.Label>
          <Form.Select
            type="gender"
            placeholder="Your gender"
            name="gender"
            onChange={handleInputChange}
            value={userFormData.gender}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>

          <Form.Control.Feedback type="invalid">
            Gender is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="about">About</Form.Label>
          <Form.Control
            type="about"
            placeholder="About You"
            name="about"
            onChange={handleInputChange}
            value={userFormData.about}
            required
          />
          <Form.Control.Feedback type="invalid">
            About is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="characteristics">Characteristics</Form.Label>
          <Form.Control
            type="characteristics"
            placeholder="Your characteristics"
            name="characteristics"
            onChange={handleInputChange}
            value={userFormData.characteristics}
            required
          />
          <Form.Control.Feedback type="invalid">
            Characteristics are required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="favorite_treat">Favorite Treat(s)</Form.Label>
          <Form.Control
            type="favorite_treat"
            placeholder="Your favorite treat(s)"
            name="favorite_treat"
            onChange={handleInputChange}
            value={userFormData.favorite_treat}
            required
          />
          <Form.Control.Feedback type="invalid">
            Favorite treat(s) are required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password &&
              userFormData.city &&
              userFormData.state &&
              userFormData.breed &&
              userFormData.age &&
              userFormData.gender &&
              userFormData.about &&
              userFormData.characteristics &&
              userFormData.favorite_treat
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;

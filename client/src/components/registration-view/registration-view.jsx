import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
  const [Username, createUsername] = useState('');
  const [Password, createPassword] = useState('');
  const [Email, createEmail] = useState('');
  const [Birthday, createBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);

     //needs finishing
  }

  return (
    <div>
      <h2 className='registration-title'> Register for My WW2 Flix</h2>
      <Card className='registration-card'>
        <Form>
          <Form.Group controlId='formBasicUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Username'
              value={Username}
              onChange={(e) => createUsername(e.target.value)}
              />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={Password}
              onChange={(e) => createPassword(e.target.value)}
              />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={Email}
              onChange={(e) => createEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDob">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder="MM/DD/YYYY"
              value={Birthday}
              onChange={(e) => createBirthday(e.target.value)}
            />
          </Form.Group>
          <Button className="button" variant="primary" type="submit" onClick={handleSubmit}>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );

}
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import './update-card.scss';

export function UpdateCard() {
  const [Username, createUsername] = useState('');
  const [Password, createPassword] = useState('');
  const [Email, createEmail] = useState('');
  const [Birthday, createBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let username =localStorage.getItem('user');
    let accessToken = localStorage.getItem('token');
   
    axios.put(`https://myww2flixdb.herokuapp.com/users/${username}`, {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    },
    { 
      headers: { Authorization: `Bearer ${accessToken}`},
    })
    .then(response => {
      const data = response.data;
      alert('Account updated successfully!');
      console.log(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error updating the user information')
    });
    console.log(Username, Password, Email, Birthday);
  }

  return (
    <div>
      <Card className='update-card'>
        <Card.Body>
          <Card.Title>Update Account Information</Card.Title>
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
                Update Information
              </Button>
              </Form>
          </Card.Body>
        </Card>
      </div>
  );

}
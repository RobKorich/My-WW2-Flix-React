import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { RegistrationView } from '../registration-view/registration-view';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  //const [ registering, setRegistering ] = useState(false);  moved to user-view

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

    if (registering) {
      return <RegistrationView />; 
    } else {
      return (
      <div>
      <h2 className='login-title'>My WW2 Flix Login</h2>
      <Card className='login-card' style={{ width: '30rem' }}>
        <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button onClick={() => setRegistering(true)} variant='link'>Create account</Button>
            <br/>
            <br/>
            <Button className="button" variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
        </Form>
      </Card>
    </div>
    );
  }
}
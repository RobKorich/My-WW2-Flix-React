import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      Favorites: [],
      Movies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    let username = localStorage.getItem('user');

    axios.get(`https://myww2flixdb.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        Favorites: response.data.Favorites
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies } = this.props;

    return (
      <div>
        <Container>
          <h2 className='profile-title'>My Profile</h2>
          <Card>
            <Card.Body>
              <Card.Title>Account Information</Card.Title>
              <br/>
              <Card.Text>Username: {this.state.Username}</Card.Text>
              <Card.Text>Email: {this.state.Email}</Card.Text>
              <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
              <Card.Text>Favorites: {this.state.Favorites}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
              <Form>

              </Form>
             </Card.Body>
          </Card>

        </Container>
      </div>
    );
  }
}
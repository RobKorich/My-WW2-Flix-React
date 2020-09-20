import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";

import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { UserView } from '../user-view/user-view';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import './main-view.scss';


export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
 
  getMovies(token) {
    axios.get('https://myww2flixdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //Click function for clicking on MovieCard in MainView to show MovieView
  /*onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }*/

  //Click function for back button on MovieView (sets state back to MainView state)
  /*onBackClick = () => {
    this.setState({
      selectedMovie: null
    });
  }*/

  onLoggedIn(authData) {
    console.log(authData)
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  /*onLoggedIn(user) {
    this.setState({
      user
    });
  }*/

  //Logs user out via logout button in navbar by setting state back to !user or user: null
  onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view">Loading Movies...</div>;

    /*return (
      <div className='main-view'>
        <Navbar className='navbar' bg='dark' fixed='top' variant='dark' expand='lg'>
          <Navbar.Brand href='#home'>
            <img src='https://www.svgrepo.com/show/136105/movie-roll.svg' className='icon' width='30' height='30' alt='My WW2 Flix Logo'/>
            My WW2 Flix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='#home'>Home</Nav.Link>
              <Nav.Link href='#profile'>Profile</Nav.Link>
              <Nav.Link href='#about'>About</Nav.Link>
              <Nav.Link onClick={this.onLoggedOut} href='#logout'>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
          {selectedMovie
            ? <MovieView movie={selectedMovie} unsetMovie={this.onBackClick}/> //movie and unsetMovie are props to MovieView
            : this.state.movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/> //movie and onClick are props to MovieCard
            ))
        }
      </div>
    );*/

    return (
      <Router>
        <div className='main-view'>
          <Navbar className='navbar' bg='dark' fixed='top' variant='dark' expand='lg'>
            <Navbar.Brand href='#home'>
              <img src='https://www.svgrepo.com/show/136105/movie-roll.svg' className='icon' width='30' height='30' alt='My WW2 Flix Logo'/>
              My WW2 Flix
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <Nav.Link href='#home'>Home</Nav.Link>
                <Nav.Link as={Link} to='/user'>Profile</Nav.Link>
                <Nav.Link href='#about'>About</Nav.Link>
                <Nav.Link onClick={this.onLoggedOut}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          
          <Route exact path='/' render={() => {
            if (!user) return <UserView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m}/>)
            }
          }/>

          <Route path='/register' render={() => <RegistrationView/>} />

          <Route path='/movies/:movieId' render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

          <Route path='/movies/directors/:name' render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
          } />

          <Route path='/movies/genres/:name' render={({match}) => {
            if (!movies) return <div className='main-view'/>;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
          } />

          <Route exact path='/user' render={() => <ProfileView movies={movies}/>} />
              
        </div>
      </Router>
    );
  }
}
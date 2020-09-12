import React, { useState } from 'react';
import { LoginView } from './login-view/login-view';
import { RegistrationView } from  './registration-view/registration-view';

import './user-view.scss';

export function UserView() {
  const [ registering, setRegistering ] = useState(false);

  setRegistering() {
    this.setState({
      registering: true
    });
  }
  

  if (registering) {
    return <RegistrationView />;
    } else {
    return <LoginView clickRegister={this.setRegistering}/>;
  }
}


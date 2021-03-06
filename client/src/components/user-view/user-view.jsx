import React, { useState } from 'react';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from  '../registration-view/registration-view';

import './user-view.scss';

export function UserView({onLoggedIn}) {
  const [ registering, setRegistering ] = useState(false);

  if (registering) {
    return <RegistrationView />;
    } else {
    return <LoginView onCreateAccountClick={() => setRegistering(true)} onLoggedIn={onLoggedIn}/>;
  }
}
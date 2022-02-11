import React, { Component } from 'react';

class Login extends Component {
  /* function checkMinimum() {

  } */

  render() {
    return (
      <div data-testid="page-login">
        <form>
          <input type="text" data-testid="login-name-input" />
          <button type="submit" data-testid="login-submit-button">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;

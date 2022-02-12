import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

/* Para checar se o input contém minimamente 3 caracteres em seu valor, passar o valor para o state a cada vez que muda. */

class Login extends Component {
  state = {
    login: '',
    buttonAbledDisabled: true,
    isItLoading: false,
    goToSearch: false,
  }

  // Verifica se o campo de login contém minimamente 3 caracteres. Se sim, habilita o botão.
  checkMinimum = () => {
    const { login } = this.state;
    const inputLoginLength = login.length;
    const numberThree = 3;
    if (inputLoginLength >= numberThree) {
      this.setState({ buttonAbledDisabled: false });
    } else {
      this.setState({ buttonAbledDisabled: true });
    }
  };

  // Acontece cada vez que o input é mudado. Coloca em um atributo do state o valor ao qual o atributo corresponde.
  handleInputChange = ({ target }) => {
    const inputValue = target.value;
    this.setState({ [target.name]: inputValue }, () => this.checkMinimum());
  };

  // Quando clica no botão de Entrar torna o isItLoading true para poder renderizar o componente Loading.
  handleLoginButton = async (event) => {
    event.preventDefault();
    const { login } = this.state;
    this.setState({ isItLoading: true });
    await createUser({ name: login });
    this.setState({ goToSearch: true });
  }

  render() {
    const { login, buttonAbledDisabled, isItLoading, goToSearch } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            name="login"
            value={ login }
            onChange={ (event) => {
              this.handleInputChange(event);
            } }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ buttonAbledDisabled }
            onClick={
              (event) => this.handleLoginButton(event)
            }
          >
            Entrar
          </button>
          <Loading isItLoading={ isItLoading } />
          { goToSearch && (<Redirect to="/search" />) }
        </form>
      </div>
    );
  }
}

export default Login;

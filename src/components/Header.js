import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    isItLoading: true,
  };

  async componentDidMount() {
    this.setState({ userName: await getUser() });
    this.stopShowLoading();
  }

  stopShowLoading = () => {
    this.setState({ isItLoading: false });
  }

  render() {
    const { userName, isItLoading } = this.state;
    return (
      <>
        <header data-testid="header-component">
          <h5 data-testid="header-user-name">
            { userName.name }
          </h5>
          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        </header>
        <Loading isItLoading={ isItLoading } />
      </>
    );
  }
}

export default Header;

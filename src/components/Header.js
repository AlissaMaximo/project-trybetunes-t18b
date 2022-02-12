import React, { Component } from 'react';
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
        </header>
        <Loading isItLoading={ isItLoading } />
      </>
    );
  }
}

export default Header;

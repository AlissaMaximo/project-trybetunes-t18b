import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Loading extends Component {
  render() {
    const { isItLoading } = this.props;
    if (isItLoading) {
      return (
        <div className="loading-page">
          <p>Carregando...</p>
        </div>
      );
    }
    return '';
  }
}

Loading.propTypes = {
  isItLoading: PropTypes.bool.isRequired,
};

export default Loading;

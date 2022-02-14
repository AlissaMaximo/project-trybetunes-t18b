import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = { isItLoading: false, prevFavBool: false };

  componentDidMount() {
    const { prevFavBool } = this.props;
    this.setState({ prevFavBool });
  }

  handleCheck = async () => {
    this.setState({ isItLoading: true });
    await addSong(this.props);
    this.setState({ isItLoading: false });
    this.setState((previous) => ({ prevFavBool: !previous.prevFavBool }));
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isItLoading, prevFavBool } = this.state;

    return (
      <>
        <section>
          <h6>{ trackName }</h6>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id="favorite"
              name="favorite"
              checked={ prevFavBool }
              onChange={ () => { this.handleCheck(); } }
            />
            Favorita
          </label>
        </section>
        <Loading isItLoading={ isItLoading } />
      </>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  prevFavBool: PropTypes.bool.isRequired,
};

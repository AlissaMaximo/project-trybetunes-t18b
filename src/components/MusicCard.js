import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = { isItLoading: false };

  handleCheck = async () => {
    this.setState({ isItLoading: true });
    await addSong(this.props);
    this.setState({ isItLoading: false });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isItLoading } = this.state;

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
};

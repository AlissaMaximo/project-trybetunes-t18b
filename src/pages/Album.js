import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    albumInfo: '',
    songs: [],
    tracksAppear: false,
    isItLoading: false,
    prevFavs: [],
  }

  componentDidMount() {
    this.getAlbumContent();
    this.retrieveFavs();
  }

  retrieveFavs = async () => {
    this.setState({ isItLoading: true });
    const prevFavs = await getFavoriteSongs();
    this.setState({ isItLoading: false, prevFavs });
    this.setState({ tracksAppear: true });
  }

  getAlbumContent = async () => {
    const { match: { params: { id } } } = this.props;
    const albumContent = await getMusics(id);
    const albumSongs = [];
    let songsIndex = 0;
    albumContent.forEach((element, i) => {
      if (i !== 0) { albumSongs[songsIndex] = element; songsIndex += 1; }
    });
    this.setState({
      albumInfo: albumContent[0],
      songs: albumSongs,
    });
  }

  showTracks = () => {
    const { songs, prevFavs } = this.state;
    if (songs.length !== 0 && prevFavs) {
      return songs.map(({ previewUrl, trackName, trackId }) => {
        const prevFavBool = prevFavs.some((checked) => checked.trackId === trackId);
        return (
          <MusicCard
            key={ trackId }
            trackId={ trackId }
            previewUrl={ previewUrl }
            trackName={ trackName }
            prevFavBool={ prevFavBool }
          />);
      });
    }
  }

  render() {
    const { albumInfo, tracksAppear, isItLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <img
            src={ albumInfo.artworkUrl100 }
            alt={ `Capa do álbum ${albumInfo.collectionName}` }
          />
          <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
          <h3 data-testid="artist-name">{ albumInfo.artistName }</h3>
          { tracksAppear && this.showTracks() }
          <Loading isItLoading={ isItLoading } />
        </div>
      </>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    albumInfo: '',
    songs: '',
  }

  componentDidMount() {
    this.getAlbumContent();
  }

  getAlbumContent = async () => {
    const { albumInfo, songs } = this.state;
    const { match: { params: { id } } } = this.props;
    const albumContent = await getMusics(id);
    const albumSongs = [];
    let songsIndex = 0;
    albumContent.forEach((element, i) => {
      if (i !== 1) { albumSongs[songsIndex] = element; songsIndex += 1; }
    });
    this.setState({
      albumInfo: albumContent[0],
      songs: albumSongs,
    });
    console.log(albumContent[0], albumSongs);
  }

  render() {
    const { albumInfo, songs } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          texto temporario
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

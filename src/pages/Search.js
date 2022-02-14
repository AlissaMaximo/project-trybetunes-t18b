import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    search: '',
    buttonAbledDisabled: true,
    isItLoading: false,
    showResults: false,
    albums: [],
  }

  // Verifica se o campo de search contém minimamente 2 caracteres. Se sim, habilita o botão.
  checkMinimum = () => {
    const { search } = this.state;
    const inputSearchLength = search.length;
    const NUMBER_TWO = 2;
    if (inputSearchLength >= NUMBER_TWO) {
      this.setState({ buttonAbledDisabled: false });
    } else {
      this.setState({ buttonAbledDisabled: true });
    }
  };

  // Acontece cada vez que o input é mudado. Coloca em um atributo do state o valor ao qual o atributo corresponde.
  handleInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.checkMinimum());
  };

  // Quando clica no botão de Entrar torna o isItLoading true para poder renderizar o componente Loading enquanto chama a API. Então mostra resultado (com álbuns ou sem álbuns).
  handleSearchButton = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({ isItLoading: true, typedSearch: search });
    const fetchedAlbums = await searchAlbumsAPI(search); // é um array c vários objetos
    this.setState({
      search: '',
      isItLoading: false,
      showResults: true,
      albums: fetchedAlbums,
    }, () => this.checkMinimum());
  }

  render() {
    const {
      buttonAbledDisabled,
      isItLoading,
      showResults,
      search,
      typedSearch,
      albums } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="search"
              value={ search }
              onChange={ (event) => {
                this.handleInputChange(event);
              } }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ buttonAbledDisabled }
              onClick={
                (event) => this.handleSearchButton(event)
              }
            >
              Pesquisar
            </button>
          </form>
          <Loading isItLoading={ isItLoading } />
          { showResults
            && albums.length > 0
            && (
              <h4>
                {`Resultado de álbuns de: ${typedSearch}`}
              </h4>)}
          { // é pra mostrar o resultado (true), e o resultado desta vez não tem álbuns, mas tem que mostrar a mensagem. como o array é vazio, mas o comprimento de um array vazio (0) é falsy, preciso negá-lo.
            showResults
            && !albums.length
            && (
              <h4>Nenhum álbum foi encontrado</h4>)
          }
          <section>
            { albums.map(({
              collectionId,
              collectionName,
              artistName,
              artworkUrl100,
            }) => (
              <section key={ collectionId }>
                <img src={ artworkUrl100 } alt={ `Capa do álbum ${collectionName}` } />
                <h6>{ collectionName }</h6>
                <p>{ artistName }</p>
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  Acessar Álbum
                </Link>
              </section>
            )) }
          </section>

        </div>
      </>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    search: '',
    buttonAbledDisabled: true,
  }

  // Verifica se o campo de search contém minimamente 3 caracteres. Se sim, habilita o botão.
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

  // Quando clica no botão de Entrar torna o isItLoading true para poder renderizar o componente Loading.
  handleSearchButton = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    await createUser({ name: search });
  }

  render() {
    const { buttonAbledDisabled } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="search"
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
        </div>
      </>
    );
  }
}

export default Search;

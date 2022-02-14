import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Search from './pages/Search';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </Router>
    );
  }
}

/*
REFERÊNCIAS
Pessoas:
Caio Swame ajudou-me nos Requisitos 2 e 3.
Lucas Pimentel ajudou-me no Requisito 3.
José Vinícius (Zé) ajudou-me no Requisito 4.

Links:
Para o Requisito 2: https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router
Para o Requisito 6: https://stackoverflow.com/questions/54401481/eslint-missing-key-prop-for-element-in-iterator-react-jsx-key , analisei o código de Rafael Alves: https://github.com/tryber/sd-018-b-project-trybetunes/pull/65/files , https://medium.com/reactbrasil/renderiza%C3%A7%C3%A3o-condicional-em-react-bb8c16dddd6f
*/

export default App;

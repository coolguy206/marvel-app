import React from 'react';
import { HomePage } from './HomePage';
import {LandingPage} from './LandingPage';
import {PdpPage} from './PdpPage';
import {SearchPage} from './SearchPage';
import {Loading} from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
   // Link,
   //useParams
} from "react-router-dom";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   searchRecipes: []
    // };
    this.search = this.search.bind(this);
    this.blur = this.blur.bind(this);
  }

  search(e){
    if(e.keyCode ===  13){
      // console.log('enter pressed');
      // console.log(e.target.value);
      var searchTerm = e.target.value;
      window.location.hash = `#/search/${searchTerm}`;
      window.location.reload();
    }
  }

  blur(e){
    var searchTerm = e.target.value;
    window.location.hash = `#/search/${searchTerm}`;
    window.location.reload();
  }

    // <Switch>
    // </Switch>

    // <Route path="/comics/:Id" component={ComicsPage} />
    // <Route path="/characters/:Id" component={CharactersPage} />
    // <Route path="/series/:Id" component={PdpPage} />
    // <Route path="/stories/:Id" component={PdpPage} />
    // <Route path="/authors/:Id" component={PdpPage} />

  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <header className="header">
            <a href="/apps/marvel-comics/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Marvel-Comics-Logo.svg/1280px-Marvel-Comics-Logo.svg.png" alt="Marvel Logo" /></a>
            <FontAwesomeIcon icon={faSearch} size="3x" />
            <input type="text" placeholder="search" onKeyUp={this.search} onBlur={this.blur} />
            <nav>
              <ul>
                <li><a href="/apps/marvel-comics/#/characters">characters</a></li>
                <li><a href="/apps/marvel-comics/#/comics">comics</a></li>
                <li><a href="/apps/marvel-comics/#/creators">creators</a></li>
                <li><a href="/apps/marvel-comics/#/events">events</a></li>
                <li><a href="/apps/marvel-comics/#/series">series</a></li>
                <li><a href="/apps/marvel-comics/#/stories">stories</a></li>
              </ul>
            </nav>
          </header>

          <section className="main">
              <Loading />
              <Route exact path="/"  component={HomePage} />
              <Route path="/:Category/:Id" component={PdpPage} />
              <Route exact path="/:Category/" component={LandingPage} />
              <Route path="/search/:searchTerm" component={SearchPage} />
          </section>
        </HashRouter>
      </React.Fragment>
    );
  }

}

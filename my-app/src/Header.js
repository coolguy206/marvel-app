import React from 'react';
import { HomePage } from './HomePage';
import {PdpPage} from './PdpPage';
import {SearchPage} from './SearchPage';
import {Loading} from './Loading';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
   // Link,
   // useParams
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

  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <header className="header pdp">
            <h1><a href="/apps/marvel-comics/">Marvel Comics</a></h1>
            <input type="text" placeholder="search" onKeyUp={this.search} onBlur={this.blur} />
          </header>

          <section className="main">
              <Loading />
              <Route exact path="/"  component={HomePage} />
              <Route path="/:Category/:Id" component={PdpPage} />
              <Route path="/search/:searchTerm" component={SearchPage} />
              <Route path="/:stories/:storyId" component={SearchPage} />
          </section>
        </HashRouter>
      </React.Fragment>
    );
  }

}

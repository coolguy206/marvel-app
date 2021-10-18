import React from 'react';
import { HomePage } from './HomePage';
import {LandingPage} from './LandingPage';
import {PdpPage} from './PdpPage';
import {SearchPage} from './SearchPage';
import {Loading} from './Loading';
import {UpArrow} from './UpArrow';
import {SearchBar} from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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
    this.state = {
      data: [],
      search:[],
      cat: ``
    };
    this.search = this.search.bind(this);
    this.blur = this.blur.bind(this);
    this.expand = this.expand.bind(this);
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', function(e){
      // console.log(`header.js scroll event`);
      // console.log(window.pageYOffset);
      if(window.pageYOffset >= 208){
        document.getElementsByClassName('back-to-top')[0].style.display = 'block';
      } else {
          document.getElementsByClassName('back-to-top')[0].style.display = 'none';
      }
    });
  }

  search(e){
    if(e.keyCode ===  13){
      console.log('enter pressed');
      // console.log(e.target.value);
      // var searchTerm = e.target.value;
      // window.location.hash = `#/search/${searchTerm}`;
      // window.location.reload();
    }
  }

  blur(e){
    // var searchTerm = e.target.value;
    // window.location.hash = `#/search/${searchTerm}`;
    // window.location.reload();
  }

  show(e){
    var searchInput =  ``;
    // console.log(e.target);
    // if(e.target.nodeName == 'svg'){
    //   // console.log('it is a svg');
    //   searchInput = e.target.previousSibling;
    //
    // } else if(e.target.nodeName == 'path') {
    //   // console.log('it is a path');
    //   searchInput = e.target.parentNode.previousSibling;
    //
    // }
    if(document.getElementsByClassName('filter-container')[0] !== undefined){
      document.getElementsByClassName('filter-container')[0].style.display = "none";
    }
    searchInput = document.getElementById('search-bar');

    if(searchInput.classList.length !== 1){
      searchInput.classList.add("show");
    } else {
      searchInput.classList.remove("show");
    }

  }

  hide(e){
    var searchInput =  ``;
    console.log(e.target);
  }

  expand(e){
    // console.log('expand function');
    // console.log(e.target);
    var nav = ``;
    if(e.target.nodeName === 'svg'){
      // console.log('it is a svg');
      nav = e.target.nextSibling.nextSibling.nextSibling;
      // console.log(nav);
    } else if(e.target.nodeName === 'path') {
      // console.log('it is a path');
      nav = e.target.parentNode.nextSibling.nextSibling.nextSibling;
      // console.log(nav);
    }
    // console.log(nav.classList);
    nav.classList.add("expand");
  }

  close(e){
    // console.log(e.target);
    var nav = ``;
    if(e.target.nodeName === 'svg'){
      // console.log('it is a svg');
      nav = e.target.parentNode;
      // console.log(nav);
      // nav.classList.add("expand");
    } else if(e.target.nodeName === 'path') {
      // console.log('it is a path');
      nav = e.target.parentNode.parentNode;
      // console.log(nav);
    } else if(e.target.nodeName === 'A') {
      // console.log('it is a path');
      nav = e.target.parentNode.parentNode.parentNode;
      // console.log(nav);
    }
    nav.classList.remove("expand");
  }

  render() {
    // console.log(`header state`);
    // console.log(this.state);
    return (
      <React.Fragment>
        <HashRouter>
          <header className="header">
            <FontAwesomeIcon icon={faBars} size="2x" onClick={this.expand} />

            <a href="/apps/marvel-comics/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Marvel-Comics-Logo.svg/1280px-Marvel-Comics-Logo.svg.png" alt="Marvel Logo" id="logo" data-arr="" /></a>

            <div className="search-bar">
              <input type="text" placeholder="Search" onKeyUp={this.search} onBlur={this.blur} />
              <FontAwesomeIcon icon={faSearch} size="2x" onClick ={this.show} />
            </div>

            <nav>
              <FontAwesomeIcon icon={faTimesCircle} size="2x" onClick={this.close} />
              <ul>
                <li><a href="/apps/marvel-comics/#/characters" onClick={this.close}>characters</a></li>
                <li><a href="/apps/marvel-comics/#/comics" onClick={this.close}>comics</a></li>
                <li><a href="/apps/marvel-comics/#/events" onClick={this.close}>events</a></li>
                <li><a href="/apps/marvel-comics/#/series" onClick={this.close}>series</a></li>
                <li><a href="/apps/marvel-comics/#/creators" onClick={this.close}>creators</a></li>
              </ul>
            </nav>
            <SearchBar />
          </header>

          <section className="main">
              <Loading />
              <Route exact path="/"  component={HomePage} />
              <Route path="/:Category/:Id" component={PdpPage} />
              <Route exact path="/:Category/" component={LandingPage} />
              <Route exact path="/search/:searchCat/:searchTerm" render={(props) => <SearchPage stuff="some stuff..." {...props} /> } />
          </section>

          <UpArrow />

        </HashRouter>
      </React.Fragment>
    );
  }
}

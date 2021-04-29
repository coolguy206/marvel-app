import React from 'react';
import { HomePage } from './HomePage';
import { Api } from './Api';
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
      search:[]
    };
    this.search = this.search.bind(this);
    this.blur = this.blur.bind(this);
    this.expand = this.expand.bind(this);
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.changePage = this.changePage.bind(this);
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

  changePage(e){
    document.getElementsByTagName('nav')[0].classList.remove("expand");
    // var href = document.location.href;
    // document.location.href = href;
    // document.location.reload();

    // console.log(e.target.innerText);
    // // var offset = Math.floor(Math.random() * 900);
    // let cat  = e.target.innerText;
    // cat = cat.toLowerCase();
    // let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;
    //
    // let url = ``;
    // url = `${baseURL}?apikey=${Api}`
    //
    //   fetch(url)
    //     .then(res => res.json()).then((results) => {
    //       // console.log('from homePage after ajax comics');
    //       // console.log(results);
    //
    //       this.setState({
    //           data: results.data.results
    //       });
    //
    //       var data = this.state.data;
    //       data = JSON.stringify(data);
    //       // console.log(data);
    //       document.getElementById('logo').dataset.arr = data;
    //       // console.log(document.getElementById('logo').dataset.arr);
    //       // document.getElementsByClassName('loading')[0].style.display = 'none';
    //       // document.getElementsByClassName('hp')[0].style.display = 'flex';
    //
    //       // console.log(this.state);
    //       }, (error) => {
    //           console.log(error);
    //   });

  }

  search(e){
    if(e.keyCode ===  13){
      // console.log('enter pressed');
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

    searchInput = document.getElementById('search-bar');

    if(searchInput.classList.length !== 1){
      searchInput.classList.add("show");
    } else {
      searchInput.classList.remove("show");
    }

    let cat  = searchInput.childNodes[1].value;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

    let url = ``;

    url = `${baseURL}?apikey=${Api}&limit=100`;

      fetch(url)
        .then(res => res.json()).then((results) => {
          console.log('ajax from search icon click');
          console.log(results);

          this.setState({
            search: results.data.results
          });

          console.log(`state`);
          console.log(this.state);
          }, (error) => {
              console.log(error);
      });


  }

  hide(e){
    var searchInput =  ``;
    console.log(e.target);
  }

  expand(e){
    // console.log('expand function');
    // console.log(e.target);
    var nav = ``;
    if(e.target.nodeName == 'svg'){
      // console.log('it is a svg');
      nav = e.target.nextSibling.nextSibling.nextSibling;
      // console.log(nav);
    } else if(e.target.nodeName == 'path') {
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
    if(e.target.nodeName == 'svg'){
      // console.log('it is a svg');
      nav = e.target.parentNode;
      // console.log(nav);
      // nav.classList.add("expand");
    } else if(e.target.nodeName == 'path') {
      // console.log('it is a path');
      nav = e.target.parentNode.parentNode;
      // console.log(nav);
    }
    nav.classList.remove("expand");
  }

    // <Switch>
    // </Switch>

    // <Route path="/comics/:Id" component={ComicsPage} />
    // <Route path="/characters/:Id" component={CharactersPage} />
    // <Route path="/series/:Id" component={PdpPage} />
    // <Route path="/stories/:Id" component={PdpPage} />
    // <Route path="/authors/:Id" component={PdpPage} />
      // <Route path="/search/:searchTerm" component={SearchPage} />

  render() {
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
                <li><a href="/apps/marvel-comics/#/characters" onClick={this.changePage}>characters</a></li>
                <li><a href="/apps/marvel-comics/#/comics" onClick={this.changePage}>comics</a></li>
                <li><a href="/apps/marvel-comics/#/events" onClick={this.changePage}>events</a></li>
                <li><a href="/apps/marvel-comics/#/series" onClick={this.changePage}>series</a></li>
              </ul>
            </nav>
            <SearchBar results={this.state.search} />
          </header>

          <section className="main">
              <Loading />
              <Route exact path="/"  component={HomePage} />
              <Route path="/:Category/:Id" component={PdpPage} />
              <Route exact path="/:Category/" component={LandingPage} />
              <Route path="/search/:searchTerm" render={(props) => <SearchPage stuff="some stuff..." {...props} /> } />

          </section>

          <UpArrow />

        </HashRouter>
      </React.Fragment>
    );
  }

}

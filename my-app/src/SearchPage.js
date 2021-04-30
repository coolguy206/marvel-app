import React from 'react';
import { Api } from './Api';
import Image from './Image';
import {Loading} from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.match.params.searchTerm,
      searchCat: this.props.match.params.searchCat,
      number: 100,
      total:0,
      stuff: this.props.stuff,
      data:[],
      found:[],
      done: false
    };
    this.getMore = this.getMore.bind(this);
  }

  componentDidMount() {

    // console.log(this.state);
    let searchCat = this.state.searchCat;
    let searchTerm  = this.state.searchTerm;

    let baseURL = `http://gateway.marvel.com/v1/public/${searchCat}`;
    let url = ``;
    url = `${baseURL}?apikey=${Api}&limit=100`

    fetch(url).then(res => res.json()).then((results) => {
      // console.log(`from search ajax`);
      console.log(results);

      this.setState({
        data: results.data.results,
        total: results.data.total
      });

      this.getMore()

      // document.getElementsByClassName("search")[0].style.display = "block";
      // document.getElementsByClassName("loading")[0].style.display = "none";

    }, (error) => {
      console.log(error);
    })
  }

  getMore(e){

    let searchCat = this.state.searchCat;
    let searchTerm  = this.state.searchTerm;

    let baseURL = `http://gateway.marvel.com/v1/public/${searchCat}`;

    let url = ``;

    url = `${baseURL}?apikey=${Api}&limit=100&offset=${this.state.number}`

    fetch(url).then(res => res.json()).then((results) => {
      // console.log(`from search ajax`);
      // console.log(results);

      var offset = this.state.number + results.data.count;
      var theData = this.state.data;
      var ajaxData = results.data.results;
      ajaxData.map(function(val,i){
        theData.push(val);
      });

      console.log(theData);

      this.setState({
        number: offset,
        beginning: false
      });

      var dataCount = this.state.data;
      dataCount = dataCount.length;

      if(dataCount < this.state.total){
        this.getMore()
      } else {
        console.log('got em all');

        var dataLength = this.state.number;
        var beginning = this.state.beginning;
        var searchCat = this.state.searchCat;
        var searchTerm = this.state.searchTerm;
        searchTerm = searchTerm.toLowerCase();

        var data = this.state.data;
        // var found = this.state.found;
        var foundData = [];
        data.map(function(val,i){
          var name = val.name;
          name = name.toLowerCase();
          if(name.indexOf(searchTerm) !== -1){
            // console.log('match');
            // console.log(val);
            foundData.push(val);
          }

        });

        this.setState({
          found: foundData,
          done: true
        });

      }

    }, (error) => {
      console.log(error);
    })
  }

  render() {
    console.log(this.state);

    var searchTerm = this.state.searchTerm;
    var searchCat = this.state.searchCat;

    var li = this.state.found;
    li = li.map(function(val,i){
      console.log(val);
      let id = val.id;
      let href = `/apps/marvel-comics#/${searchCat}/${id}`;
      let name = val.name;
      // console.log(name);
      if(name == undefined){
        name = val.title;
      }

      return(
        <li key={i}>
          <a href={href}>
            <h2>{name}</h2>
            <Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension} />
          </a>
        </li>
      )
    });

    var content = ``;
    var found = this.state.found;
    if(this.state.done){
      if(found.length > 0){
        content = (
          <ul>
            {li}
          </ul>
        )
      } else {
        content = (
          <p>Sorry we couldn't find what you were looking for. Please try another search.</p>
        )
      }

      var loading2 = document.getElementsByClassName('loading')[1];
      if(loading2 !== undefined){
        loading2.style.display = 'none';
      }
    }


    var landing =  document.getElementsByClassName('search')[0];
    if(landing !== undefined){
      landing.style.display = 'block';
    }
    var loading = document.getElementsByClassName('loading')[0];
    if(loading !== undefined){
      loading.style.display = 'none';
    }


    return (
      <React.Fragment>
        <div className="search">
          <h1>Search: {searchTerm}</h1>
          <Loading />
          {content}
        </div>
      </React.Fragment>
    )

  } //end of render
}

import React from 'react';
import { Api } from './Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.close = this.close.bind(this);
    this.filter = this.filter.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  filter(e){
    console.log('filter function from SearchBar');
    // console.log(this.props.results);
    this.setState({
      results: this.props.results
    });
    console.log(this.state);
    console.log(e.target.value);
    var ul = document.getElementById('autocomplete');
    ul.style.display = 'block';
    var str = e.target.value;
    var li = ul.childNodes;
    console.log(li);
    li.forEach(function(val, i){
      var liStr = val.innerText;
      // console.log(liStr, str);
      if(liStr == 'Load More' || liStr.indexOf(str) !== -1){
        val.style.display = 'block';
      } else {
        val.style.display = 'none';
      }
    });
  }

  loadMore(e){
    console.log('loadMore function');
    var searchInput = document.getElementById('search-bar');

    let cat  = searchInput.childNodes[1].value;
    let offset = this.state.results;
    offset = offset.length;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

    let url = ``;

    url = `${baseURL}?apikey=${Api}&limit=100&offset=${offset}`;

      fetch(url)
        .then(res => res.json()).then((results) => {
          // console.log('ajax from autocomplete click');
          // console.log(results.data.results);

          var thisState = this.state.results;
          var ajaxResults = results.data.results;
          ajaxResults.map(function(val,i){
            thisState.push(val);
          });


          // this.setState({
          //   search: results.data.results
          // });
          //
          console.log(`state after fetch from autocomplete click`);
          console.log(this.state);
          }, (error) => {
              console.log(error);
      });

  }

  close(e){
    // console.log(e.target);
    var searchInput = document.getElementById('search-bar');
    searchInput.classList.remove("show");
  }

  render() {
    // console.log(`from SearchBar`);
    // console.log(this.props.results);
    // console.log(this.state);

    var searchResults = this.props.results;

    var li = searchResults.map(function(val,i){
      return(<li key={i} id={val.id}>{val.name}</li>);
    });

    return (
      <React.Fragment>
        <div id="search-bar">
          <FontAwesomeIcon icon={faTimesCircle} size="3x" onClick={this.close} />

          <select>
            <option value="characters">characters</option>
            <option value="comics">comics</option>
            <option value="events">events</option>
            <option value="series">series</option>
            <option value="stories">stories</option>
            <option value="creators">creators</option>
          </select>
          <div>
            <input type="text" placeholder="Search" onKeyUp={this.filter} />
            <ul id="autocomplete">
              {li}
              <li onClick={this.loadMore} style={{display:'block !important'}}>Load More</li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

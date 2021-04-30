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
      results: []
    };
    this.close = this.close.bind(this);
    this.filter = this.filter.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  filter(e){
    // console.log('filter function from SearchBar');
    // console.log(e.target);

    var str = e.target.previousSibling.value;
    str = str.toLowerCase();

    var cat = e.target.parentNode.previousSibling.value;

    var url = `/apps/marvel-comics/#/search/${cat}/${str}`;
    window.location.href = url;

    this.close();
    // console.log(this.props.results);
    // this.setState({
    //   results: this.props.results
    // });
    // console.log(this.state);
    // console.log(e.target.value);
    // var ul = document.getElementById('autocomplete');
    // ul.style.display = 'block';
    // var str = e.target.value;
    // str = str.toLowerCase();

    // var li = ul.childNodes;
    // // console.log(li);
    // li.forEach(function(val, i){
    //   var liStr = val.innerText;
    //   liStr = liStr.toLowerCase();
    //
    //   if(liStr == 'load more' || liStr.indexOf(str) !== -1){
    //
    //     val.style.display = 'block';
    //   } else {
    //     // console.log('no match');
    //     // console.log(liStr, str);
    //     val.style.display = 'none';
    //   }
    // });
  }

  loadMore(e){
    console.log('loadMore function');
    // this.setState({
    //   results: this.props.results
    // });
    // console.log(this.state);

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

          document.getElementById('autocomplete').style.display =  'none';
          searchInput.childNodes[2].childNodes[0].value= "";
          searchInput.childNodes[2].childNodes[0].focus()

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

    // var searchResults = ``;
    // var resultsLength = this.state.results;
    // if(resultsLength.length > 1){
    //   searchResults = this.state.results;
    // } else {
    //   searchResults = this.props.results;
    // }



    // var li = searchResults.map(function(val,i){
    //   return(<li key={i} id={val.id}>{val.name}</li>);
    // });

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
            <input type="text" placeholder="Search" />
            <input type="button" value="Search" onClick={this.filter}  />
            <ul id="autocomplete">
            
              <li onClick={this.loadMore} style={{display:'block !important'}}>Load More</li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

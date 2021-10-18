import React from 'react';
import { Api } from './Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Database from './Database';


export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      characters:[],
      events:[],
      series:[],
      creators:[],
      selected: `characters`,
    };
    this.close = this.close.bind(this);
    this.filter = this.filter.bind(this);
    this.setDatabase = this.setDatabase.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.search = this.search.bind(this);
  }

  selectChange(e){
    // console.log(`select change from search bar`);
    // console.log(e.target.value);
    this.setState({
      selected: e.target.value
    });
  }

  setDatabase($this, theDb, baseURL, str, func){
    theDb.allDocs({include_docs: true}).then((docs) => {
      // console.log(`${str} all docs from search bar`);
      // console.log(docs);
      return docs;
    }).then((docs) => {
      var arr = [];
      docs.rows.map((val, i) => {
        var title = ``;
        var s = str;
        if(s ==  `creators`){
          title = val.doc.fullName;
        } else {
          title = val.doc.title;
          if(title == undefined){
            title = val.doc.name;
          }
        }

        var id = val.doc.id;
        var url = `${baseURL}/${str}/${id}`;
        var obj = {
          title: title,
          url: url
        };
        arr.push(obj);
      });
      // console.log(`${str} array from search bar`);
      // console.log(arr);
      func($this, arr)
    });
  }

  componentDidMount() {
    var db = Database;
    // console.log(`search bar database`);
    // console.log(db);
    var baseURL = `/apps/marvel-comics/#`;

    this.setDatabase(this, db.comics, baseURL, 'comics', function($this, list){
      $this.setState({
        comics: list
      });
    });

    this.setDatabase(this, db.characters, baseURL, 'characters', function($this, list){
      $this.setState({
        characters: list
      });
    });

    this.setDatabase(this, db.events, baseURL, 'events', function($this, list){
      $this.setState({
        events: list
      });
    });

    this.setDatabase(this, db.series, baseURL, 'series', function($this, list){
      $this.setState({
        series: list
      });
    });

    this.setDatabase(this, db.creators, baseURL, 'creators', function($this, list){
      $this.setState({
        creators: list
      });
    });

  }

  search(e){
    // console.log(`search from search bar`);
    var str = e.target.previousSibling.value;
    str = str.toLowerCase();
    // console.log(str)
    var cat = e.target.parentNode.previousSibling.value;
    // console.log(cat);
    var url = `/apps/marvel-comics/#/search/${cat}/${str}`;
    // console.log(url);

    window.location.href = url;

    // if(e.keyCode ===  13){
    //   console.log('enter pressed');
    //   console.log(e.target.value);
    //   var searchTerm = e.target.value;
    //   window.location.hash = `#/search/${searchTerm}`;
    //   window.location.reload();
    //   window.location.href = url;
    // }


    this.close();
  }

  filter(e){
    var str = e.target.value;
    str = str.toLowerCase();
    // console.log(str)
    var ul = document.getElementById('autocomplete');
    ul.style.display = 'block';
    var li = ul.childNodes;
    // console.log(li);
    li.forEach((val, i) => {
      var liStr = val.innerText;
      liStr = liStr.toLowerCase();
      if(liStr.indexOf(str) !== -1){
        val.style.display = 'block';
      } else {
        // console.log('no match');
        // console.log(liStr, str);
        val.style.display = 'none';
      }
    });
  }

  close(e){
    // console.log(e.target);
    var searchInput = document.getElementById('search-bar');
    searchInput.classList.remove("show");
    searchInput.children[2].children[0].value = ``;
    var ul = document.getElementById('autocomplete');
    ul.style.display = 'none';
    var li = ul.childNodes;
    li.forEach((val, i) => {
      val.style.display = 'none';
    });
  }

  render() {
    // console.log(`from SearchBar state`);
    // console.log(this.props.results);
    // console.log(this.state);

    var li = ``;
    var arr = [];
    switch(this.state.selected){
      case `characters`:
        arr = this.state.characters;
        break;
      case `comics`:
        arr = this.state.comics;
        break;
      case `events`:
        arr = this.state.events;
        break;
      case `series`:
        arr = this.state.series;
        break;
      case `creators`:
        arr = this.state.creators;
        break;
    }

    li = arr.map((val,i) => {
      return(<li key={i}><a href={val.url} onClick={this.close}>{val.title}</a></li>);
    });

    return (
      <React.Fragment>
        <div id="search-bar">
          <FontAwesomeIcon icon={faTimesCircle} size="3x" onClick={this.close} />
          <select onChange={this.selectChange}>
            <option value="characters">characters</option>
            <option value="comics">comics</option>
            <option value="events">events</option>
            <option value="series">series</option>
            <option value="creators">creators</option>
          </select>
          <div>
            <input type="text" onKeyUp = {this.filter} placeholder="Search" />
            <input type="button" value="Search" onClick={this.search} />
            <ul id="autocomplete">
              {li}
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

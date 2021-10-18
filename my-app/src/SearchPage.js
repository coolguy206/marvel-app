import React from 'react';
import { Api } from './Api';
import Image from './Image';
import {Loading} from './Loading';
import {SearchBar} from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Database from './Database';
import {FilterIcon} from './FilterIcon';

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.match.params.searchTerm,
      searchCat: this.props.match.params.searchCat,
      stuff: this.props.stuff,
      data:[],
    };
    // this.getMore = this.getMore.bind(this);
  }

  componentDidMount() {
    // console.log(this.state);
    document.getElementsByClassName('pdp')[0].style.display = "none";
    let searchCat = this.state.searchCat;
    let searchTerm  = this.state.searchTerm;
    searchTerm = searchTerm.toLowerCase();
    var db = Database;
    var theDb = ``;
    switch(searchCat){
      case `characters`:
        theDb = db.characters;
        break;
      case `comics`:
        theDb = db.comics;
        break;
      case `events`:
        theDb = db.events;
        break;
      case `series`:
        theDb = db.series;
        break;
      case `creators`:
        theDb = db.creators;
        break;
    }

    theDb.allDocs({include_docs: true}).then((docs) => {
      // console.log(`all docs from search page`);
      // console.log(docs);
      return docs;
    }).then((docs) => {
      var arr = [];
      docs.rows.map((val, i) => {
        var title = ``;
        var s = searchCat;
        if(s ==  `creators`){
          title = val.doc.fullName;
        } else {
          title = val.doc.title;
          if(title == undefined){
            title = val.doc.name;
          }
        }
        title = title.toLowerCase();
        // console.log(title, searchTerm, title.indexOf(searchTerm));
        if(title.indexOf(searchTerm) !== -1){
          arr.push(val.doc);
        }
      });
      // console.log(`array from search page`);
      // console.log(arr);
      this.setState({
        data: arr
      });
    });
  }

  render() {
    // console.log(`search page state`);
    // console.log(this.state);

    if(this.state.searchTerm !== this.props.match.params.searchTerm){
      // console.log(`search don't match`);
      window.location.reload();
    }

    var searchTerm = this.state.searchTerm;
    var searchCat = this.state.searchCat;
    var catUrl = `/apps/marvel-comics/#/${searchCat}`
    var li = ``;
    li = this.state.data;
    if(li !== undefined){
      li = li.map(function(val,i){
        // console.log(val);
        let id = val.id;
        let href = `/apps/marvel-comics/#/${searchCat}/${id}`;
        let name = val.name;
        // console.log(name);
        if(name == undefined){
          name = val.title;
          if(name == undefined){
            name = val.fullName;
          }
        }
        var img = val.thumbnail;
        if(img !== null){
          img = <Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension} />
        } else {
          img = ``;
        }

        return(
          <li key={i}>
            <a href={href}>
              <h2>{name}</h2>
              {img}
            </a>
          </li>
        )
      });
    }

    var loading2 = document.getElementsByClassName('loading')[1];
    if(loading2 !== undefined){
      loading2.style.display = "block";
    }

    var content = ``;
    var data = this.state.data;
    var dataLength = data.length;
    if(dataLength !== 0 ){
      content = (<ul>{li}</ul>)
    } else {
      content = (
        <div>
          <h3>Sorry we couldn't find what you were looking for.<br className="desktop" /> Please try another search or try loading more <a href={catUrl}>{searchCat}</a>.</h3>
        </div>
      )
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
          <h1>Search {searchCat}:<br className="mobile" /> "{searchTerm}"</h1>
          <FilterIcon data={this.state.data} cat={this.state.searchCat} $this={this}/>
          {content}
        </div>
      </React.Fragment>
    )
  } //end of render
}

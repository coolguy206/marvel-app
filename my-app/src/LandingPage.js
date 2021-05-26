import React from 'react';
import { Api } from './Api';
import Image from './Image';
import { List } from './List';
import {Loading} from './Loading';
import { setStorage } from './SetStorage';

export class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 20,
      data: []
    };
    this.hover = this.hover.bind(this);
    this.getMore = this.getMore.bind(this);
  }

  componentDidMount() {
    var localStorageComics = window.localStorage.getItem("comics");
    var localStorageCharacters = window.localStorage.getItem("characters");
    var localStorageEvents = window.localStorage.getItem("events");
    var localStorageSeries = window.localStorage.getItem("series");
    var localStorageCreators = window.localStorage.getItem("creators");
    var localStorageStories = window.localStorage.getItem("stories");
    // var offset = Math.floor(Math.random() * 900);
    let cat  = this.props.match.params.Category;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}?apikey=${Api}`;
    var theData = ``;
    switch(cat){
      case 'comics':
        if(localStorageComics == null){
          console.log(`landingPage.js local storage null`);
          fetch(baseURL).then(res => res.json()).then((results) => {
            console.log('from landing page after ajax');
            //console.log(results);
            // var offset = this.state.offset + results.data.offset;
            // console.log(typeof offset);
            theData = {data: results.data.results, offset: results.data.limit}
            theData = JSON.stringify(theData);
            localStorage.setItem("comics", theData);
            this.setState({
                data: results.data.results,
                offset: results.data.limit
            });
          }, (error) => {
            console.log(error);
          });
        } else {
          console.log(`landingPage.js local storage not null`);
          theData = setStorage('comics');
          this.setState({
              data: theData.data,
              offset: theData.offset
          });
        }
        break;
    }

    //let url = ``;
    // if(cat !== 'stories'){
    //   if(cat !== 'events'){
    //     url = `${baseURL}?apikey=${Api}&offset=${offset}`;
    //   } else {
    //     url = `${baseURL}?apikey=${Api}`;
    //   }

    //url = `${baseURL}`
/*
      fetch(url)
        .then(res => res.json()).then((results) => {
          console.log('from landing page after ajax');
          console.log(results);

          var offset = this.state.offset + results.data.offset;
          console.log(typeof offset);

          this.setState({
              data: results.data.results,
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

          // console.log(this.state);
          }, (error) => {
              console.log(error);
      });

    // }
*/
  }
/*
  changeLanding(e){
		console.log(`landing changeLanding`);
		//console.log(e);
		//console.log(e.target);

		let url = e.target.href;
		let urlArr = url.split('/');
		let cat = urlArr[urlArr.length - 2];
		let id = urlArr[urlArr.length -1];
		//console.log(url, urlArr, cat, id);


		let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

		// on page load data
		let dataURL = `${baseURL}/${id}?apikey=${Api}`;
		fetch(dataURL).then(res => res.json()).then((results) => {
			console.log(results);

			// this.setState({
			// 	data: results.data.results[0]
			// });

		}, (error) => {
			console.log(error);
		});
	}
*/
  getMore(e){
    console.log(`getMore function`);
    //console.log(e.target);
    var theButton = e.target;
    theButton.style.display = 'none';
    var theLoading = e.target.nextSibling;
    theLoading.style.display = 'block';
    var offset = this.state.offset;
    let cat  = this.props.match.params.Category;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}?apikey=${Api}&offset=${offset}`;

    var localStorageComics = window.localStorage.getItem("comics");
    var localStorageCharacters = window.localStorage.getItem("characters");
    var localStorageEvents = window.localStorage.getItem("events");
    var localStorageSeries = window.localStorage.getItem("series");
    var localStorageCreators = window.localStorage.getItem("creators");
    var localStorageStories = window.localStorage.getItem("stories");

    fetch(baseURL).then(res => res.json()).then((results) => {
      // console.log('ajax from button click landing page');
      console.log(results);

      var theData = this.setStorage('comics');
      var ajaxData = results.data.results;
      ajaxData.map(function(val,i){
        theData.data.push(val);
      });

      console.log('before');
      console.log(theData);
      theData.data = Array.from(new Set(theData.data.map(a => a.id))).map(id => {
        return theData.data.find(a => a.id === id)
      })
      console.log('after');
      console.log(theData);

      // var x = theData.data;
      // x.forEach(function(val, i){
      //   console.log(val.title);
      // });

      theData.offset = theData.offset + results.data.offset;
      // console.log(`theData`);
      // console.log(theData);
      var theData2 = JSON.stringify(theData);
      localStorage.setItem("comics", theData2);
      this.setState({
          data: theData.data,
          offset: theData.offset
      });

      theButton.style.display = 'block';
      theLoading.style.display = 'none';

      // console.log(this.state);
    }, (error) => {
      console.log(error);
    });
  }

  hover(e){

  }

  render() {
    console.log(this.state);
    // console.log(document.getElementById('logo').dataset.arr);
    // var arr = document.getElementById('logo').dataset.arr;

    let data = ``;
    let li =``;
    let cat  = this.props.match.params.Category;
    if(this.state.data !== undefined){
      // data =  <List url={cat} list={this.state.data} />
      var listItems = this.state.data;
      li = listItems.map(function(val, i){
        let id = val.id;
        let href = `/apps/marvel-comics#/${cat}/${id}`;
        let name = val.name;
        //console.log(name);
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



    }


    // if(arr !== ''){
    //   arr = JSON.parse(arr);
    //   console.log(arr);
    //   data =  <List url={cat} list={arr} />
    // } else {
    //   if(this.state.data !== undefined){
    //     data =  <List url={cat} list={this.state.data} />
    //   }
    // }

    //document.getElementsByClassName('landing-page')[0].style.display = 'block';
    var landing =  document.getElementsByClassName('landing-page')[0];
    if(landing !== undefined){
      landing.style.display = 'block';
    }
    var loading = document.getElementsByClassName('loading')[0];
    if(loading !== undefined){
      loading.style.display = 'none';
    }

    return (
      <React.Fragment>
        <div className="landing-page">
          <h1>{cat}</h1>
          <ul>
            {li}
          </ul>
          <button onClick={this.getMore}>load more</button>
          <Loading />
        </div>
      </React.Fragment>
    );

  }
}

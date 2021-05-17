import React from 'react';
import { Api } from './Api';
import { List } from './List';
import MakeFeatured from './MakeFeatured';


export class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comics:[],
      characters: [],
      events:[],
      series:[],
    };
    this.setStorage = this.setStorage.bind(this);
  }

  setStorage(str){
    //console.log(`set local storage`);
    var data = localStorage.getItem(str);
    data = JSON.parse(data);
    //console.log(data);
    return data;
  }

  componentDidMount() {

    var localStorageComics = window.localStorage.getItem("comics");
    var localStorageCharacters = window.localStorage.getItem("characters");
    var localStorageEvents = window.localStorage.getItem("events");
    var localStorageSeries = window.localStorage.getItem("series");
    var localStorageCreators = window.localStorage.getItem("creators");
    var localStorageStories = window.localStorage.getItem("stories");
    // console.log('HomePage.js componentDidMount');
    // console.log(localStorageComics);

    var comics = {};
    var characters = {};
    var events = {};
    var series = {};
    var creators = {};
    var stories = {};

    let baseURL = `http://gateway.marvel.com/v1/public/`;

    if(localStorageComics == null){
      // var offset = Math.floor(Math.random() * 900);
      let comicsUrl = `${baseURL}comics?apikey=${Api}`;
      fetch(comicsUrl).then(res => res.json()).then((results) => {
          // console.log('from homePage after ajax comics');
          // console.log(results);
          comics = {data: results.data.results, offset: results.data.limit}
          // console.log(comics);
          comics = JSON.stringify(comics);
          localStorage.setItem("comics", comics);
          this.setState({
              comics: results.data.results
          });
          // console.log(this.state);
      }, (error) => {
          console.log(error);
      });
    } else {
      comics = this.setStorage('comics');
      this.setState({
          comics: comics.data
      });
    }

    if(localStorageCharacters == null){
      let charactersUrl = `${baseURL}characters?apikey=${Api}`;
      fetch(charactersUrl).then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax characters');
        // console.log(results);
        characters = {data: results.data.results, offset: results.data.limit}
        // console.log(characters);
        characters = JSON.stringify(characters);
        localStorage.setItem("characters", characters);
        this.setState({
          characters: results.data.results
        });
        // console.log(this.state);
      }, (error) => {
        console.log(error);
      });
    } else {
      characters = this.setStorage('characters');
      this.setState({
          characters: characters.data
      });
    }

    if(localStorageEvents == null){
      let eventsUrl = `${baseURL}events?apikey=${Api}`;
      fetch(eventsUrl).then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax events');
        // console.log(results);
        events = {data: results.data.results, offset: results.data.limit}
        // console.log(events);
        events = JSON.stringify(events);
        localStorage.setItem("events", events);
        this.setState({
          events: results.data.results
        });
        // console.log(this.state);
      }, (error) => {
          console.log(error);
      });
    } else {
      events = this.setStorage('events');
      this.setState({
          events: events.data
      });
    }

    if(localStorageSeries == null){
      let seriesUrl = `${baseURL}series?apikey=${Api}`;
      fetch(seriesUrl).then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax series');
        // console.log(results);
        series = {data: results.data.results, offset: results.data.limit}
        // console.log(series);
        series = JSON.stringify(series);
        localStorage.setItem("series", series);
        this.setState({
            series: results.data.results
        });
        // console.log(this.state);
      }, (error) => {
          console.log(error);
      });
    } else {
      series = this.setStorage('series');
      this.setState({
          series: series.data
      });
    }



    if(localStorageCreators == null){
      let creatorsUrl = `${baseURL}creators?apikey=${Api}`;
      fetch(creatorsUrl).then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax creators');
        // console.log(results);
        creators = {data: results.data.results, offset: results.data.limit}
        // console.log(series);
        creators = JSON.stringify(creators);
        localStorage.setItem("creators", creators);
        // this.setState({
        //   authors: results.data.results
        // });
      }, (error) => {
        console.log(error);
      });
    } else {
      creators = this.setStorage('creators');
      // this.setState({
      //     series: series.data
      // });
    }

    if(localStorageStories == null){
      let storiesUrl = `${baseURL}stories?apikey=${Api}`;
      fetch(storiesUrl).then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax stories');
        // console.log(results);
        stories = {data: results.data.results, offset: results.data.limit}
        // console.log(series);
        stories = JSON.stringify(stories);
        localStorage.setItem("stories", stories);
        // this.setState({
        //     stories: results.data.results
        // });
      }, (error) => {
        console.log(error);
      });
    } else {
      stories = this.setStorage('stories');
      // this.setState({
      //     series: series.data
      // });
    }

  }

  render() {
	// console.log(this.state);
    var comicsArr = this.state.comics;
    var comicsLength = comicsArr.length;
    var comic1 = ``;
	var comic2 = ``;
	
	var randomNum = Math.floor(Math.random() * Math.floor(20));
	//var randomNum = Math.floor(Math.random() * Math.floor(20));
	//console.log(`random numbers`);
	//console.log(randomNum);

    if(comicsLength === 20){
		var comic1Title = comicsArr[randomNum].title;
		// console.log(comic1Title);
		comic1 = <MakeFeatured arr={comicsArr} url="/apps/marvel-comics#/comics/" id="true" number={randomNum} title={comic1Title} />
		comic2 = <MakeFeatured arr={comicsArr} url="/apps/marvel-comics#/comics/" id="false" number={randomNum} title="comics" />
    }

	var charactersArr = this.state.characters;
    var charactersLength = charactersArr.length;
    var character = '';
	
    if(charactersLength === 20){
		character = <MakeFeatured arr={charactersArr} url="/apps/marvel-comics#/characters/" id="false" number={randomNum} title="characters" />
    }

	var seriesArr = this.state.series;
    var seriesLength = seriesArr.length;
    var series = '';

    if(seriesLength === 20){
		series = <MakeFeatured arr={seriesArr} url="/apps/marvel-comics#/series/" id="false" number={randomNum} title="series" />
    }

	var eventsArr = this.state.events;
    var eventsLength = eventsArr.length;
    var event = '';

    if(eventsLength === 20){
		event = <MakeFeatured arr={eventsArr} url="/apps/marvel-comics#/events/" id="false" number={randomNum} title="events" />
    }

    let comics = ``;
    if(comicsLength === 20){
		comics =  <List url='comics' list={this.state.comics} slider='true'/>
    }

    let characters = ``;
    if(this.state.characters !== undefined){
		characters =  <List url='characters' list={this.state.characters} slider='true' />
    }

    let seriesUL = ``;
    if(this.state.series !== undefined){
		seriesUL =  <List url='series' list={this.state.series} slider='true' />
    }

    let eventsUL = ``;
    if(this.state.events !== undefined){
		eventsUL =  <List url='events' list={this.state.events} slider='true' />
    }

    // let stories = ``;
    // if(this.state.stories !== undefined){
    //   stories =  <List url='stories' list={this.state.stories} />
    // }

    // let authors = ``;
    // if(this.state.authors !== undefined){
    //   authors =  <List url='authors' list={this.state.authors} />
    // }

	if(comicsLength === 20 && charactersLength === 20 && seriesLength === 20 && eventsLength === 20) {
		document.getElementsByClassName('loading')[0].style.display = 'none';
		var hps = document.getElementsByClassName('hp');
		//console.log(hps);

		for (let val of hps) {
			//console.log(val);
			if(val.className === "hp top"){
				val.style.display = 'flex';
			} else {
				val.style.display = 'block';
			}
		}
	}


    return (
      <React.Fragment>
        <div className="hp top">
          <div className="featured featured_1">{comic1}</div>

          <div className="featured featured_2">
			      <div>{comic2}</div>
			      <div>{character}</div>
			      <div>{series}</div>
			      <div>{event}</div>
          </div>
		</div>

        <div className="hp">
          <h2>Comics</h2>
			    {comics}
        </div>

        <div className="hp">
          <h2>Characters</h2>
          {characters}
        </div>

        <div className="hp">
          <h2>Series</h2>
          {seriesUL}
        </div>

        <div className="hp">
          <h2>Events</h2>
          {eventsUL}
        </div>

      </React.Fragment>
    );
  }
}

import React from 'react';
import { Api } from './Api';
import { List } from './List';
import MakeFeatured from './MakeFeatured';
import Database from './Database';

export class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comics:[],
      characters: [],
      events:[],
      series:[],
    };
    this.getSetData = this.getSetData.bind(this);
  }

  getSetData($this, theDb, str, theUrl, func) {
    // console.log(theDb, str, theUrl);
    // return new Promise((resolve, reject) => {

      theDb.allDocs({include_docs: true}).then((docs) => {
        // console.log(`${str} all docs`);
        // console.log(docs);
        return docs;
      }).then((docs) => {
        //check if there is any data in the comics database
        if (docs.total_rows == 0){
          // no comics in the database then ajax get comics
          fetch(theUrl).then(res => res.json()).then((results) => {
            // console.log(`ajax Fetch ${str}`);
            // console.log(results);
            return results;
          }).then((results) => {
            // add _id to each comic and push to array
            var updatedArray = [];
            var theArray = results.data.results;
            theArray.map((obj, i) => {
              var doc = {};
              doc["_id"] = `${str}-${obj.id}`;
              var returnedTarget = Object.assign(obj, doc)
              // console.log(returnedTarget);
              updatedArray.push(returnedTarget);
            });
            return updatedArray;
          }).then((updatedArray) => {
            // push the array to the database
            theDb.bulkDocs(updatedArray).then((items) => {
              // console.log(`${str} bulkDocs`);
              // console.log(items);
              // console.log(updatedArray);
              return updatedArray;
            }).then((updatedArray) => {
              // comics in the Database set the state
              // console.log(`setState ${str} after bulkDocs`);
              func($this, updatedArray);
            });
          });
        } else {
          // console.log(`${str} database not empty just setstate no ajax`);
          var updatedArray = [];
          var theArray = docs.rows;
          theArray.map((obj, i) => {
            updatedArray.push(obj.doc);
          });
          func($this, updatedArray);
        }
      }).catch((err) => {
        console.log(`home page error`);
        console.log(err);
        // func($this, updatedArray);
      });
  };

  componentDidMount() {

    var db = Database;

    // db.comics.destroy().then(function (response) {
    //   // success
    //   console.log(`database destroyed`);
    //   console.log(response);
    // }).catch(function (err) {
    //   console.log(err);
    // });

    // db.comics.info().then(function (info) {
    //   console.log(info);
    // });

    let baseURL = `http://gateway.marvel.com/v1/public/`;

    //get set comics
    let comicsUrl = `${baseURL}comics?apikey=${Api}`;
    this.getSetData(this, db.comics, 'comics', comicsUrl, function($this, list){
      // console.log(`after getSetData comics`);
      // console.log(list);
      $this.setState({
        comics: list
      });
    });

    //get set characters
    let charactersUrl = `${baseURL}characters?apikey=${Api}`;
    this.getSetData(this, db.characters, 'characters', charactersUrl, function($this, list){
      // console.log(`after getSetData characters`);
      // console.log(list);
      $this.setState({
        characters: list
      });
    });

    //get set events
    let eventsUrl = `${baseURL}events?apikey=${Api}`;
    this.getSetData(this, db.events, 'events', eventsUrl, function($this, list){
      // console.log(`after getSetData events`);
      // console.log(list);
      $this.setState({
        events: list
      });
    });

    //get set series
    let seriesUrl = `${baseURL}series?apikey=${Api}`;
    this.getSetData(this, db.series, 'series', seriesUrl, function($this, list){
      // console.log(`after getSetData series`);
      // console.log(list);
      $this.setState({
        series: list
      });
    });

    //get set creators
    let creatorsUrl = `${baseURL}creators?apikey=${Api}`;
    this.getSetData(this, db.creators, 'creators', creatorsUrl, function($this, list){
      // console.log(`after getSetData creators`);
      // console.log(list);
      $this.setState({
        creators: list
      });
    });

    //get set stories
    let storiesUrl = `${baseURL}stories?apikey=${Api}`;
    this.getSetData(this, db.stories, 'stories', storiesUrl, function($this, list){
      // console.log(`after getSetData stories`);
      // console.log(list);
      $this.setState({
        stories: list
      });
    });
  }

  render() {
	  // console.log(this.state);
    var randomNum = Math.floor(Math.random() * Math.floor(20));
    var randomNum1 = Math.floor(Math.random() * Math.floor(20));
    var randomNum2 = Math.floor(Math.random() * Math.floor(20));
	  //console.log(`random numbers`);
	  //console.log(randomNum);

    var comicsArr = this.state.comics;
    var comicsLength = comicsArr.length;
    var comic1 = ``;
	  var comic2 = ``;
    let comics = ``;
    if(comicsLength >= 20){
		  var comic1Title = comicsArr[randomNum1].title;
		  // console.log(comic1Title);
		  comic1 = <MakeFeatured arr={comicsArr} url="/apps/marvel-comics/#/comics/" id="true" number={randomNum1} title={comic1Title} />
		  comic2 = <MakeFeatured arr={comicsArr} url="/apps/marvel-comics/#/comics/" id="false" number={randomNum2} title="comics" />
      comics =  <List url='comics' list={this.state.comics} slider='true'/>
    }

    var charactersArr = this.state.characters;
    var charactersLength = charactersArr.length;
    var character = '';
    let characters = ``;
    if(charactersLength >= 20){
		  character = <MakeFeatured arr={charactersArr} url="/apps/marvel-comics/#/characters/" id="false" number={randomNum} title="characters" />
      characters =  <List url='characters' list={this.state.characters} slider='true' />
    }

	  var seriesArr = this.state.series;
    var seriesLength = seriesArr.length;
    var series = '';
    let seriesUL = ``;
    if(seriesLength >= 20){
		  series = <MakeFeatured arr={seriesArr} url="/apps/marvel-comics/#/series/" id="false" number={randomNum} title="series" />
      seriesUL =  <List url='series' list={this.state.series} slider='true' />
    }

    var eventsArr = this.state.events;
    var eventsLength = eventsArr.length;
    var event = '';
    let eventsUL = ``;
    if(eventsLength >= 20){
		  event = <MakeFeatured arr={eventsArr} url="/apps/marvel-comics/#/events/" id="false" number={randomNum} title="events" />
      eventsUL =  <List url='events' list={this.state.events} slider='true' />
    }


	  if(comicsLength >= 20 && charactersLength >= 20 && seriesLength >= 20 && eventsLength >= 20) {
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

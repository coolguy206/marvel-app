import React from 'react';
import { Api } from './Api';
import { List } from './List';
import Image from './Image';
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
    this.hover = this.hover.bind(this);
  }

  componentDidMount() {

    var offset = Math.floor(Math.random() * 900);
    let baseURL = `http://gateway.marvel.com/v1/public/`;

    let comicsUrl = `${baseURL}comics?apikey=${Api}&offset=${offset}`;
    fetch(comicsUrl)
      .then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax comics');
        // console.log(results);

        this.setState({
            comics: results.data.results
        });

        // document.getElementsByClassName('loading')[0].style.display = 'none';
        // document.getElementsByClassName('hp')[0].style.display = 'flex';

        // console.log(this.state);
        }, (error) => {
            console.log(error);
        }
    )


    let charactersUrl = `${baseURL}characters?apikey=${Api}&offset=${offset}`;
    fetch(charactersUrl)
      .then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax characters');
        // console.log(results);

        this.setState({
            characters: results.data.results
        });

        // document.getElementsByClassName('loading')[0].style.display = 'none';
        // document.getElementsByClassName('hp')[0].style.display = 'flex';

        // console.log(this.state);
        }, (error) => {
            console.log(error);
        }
    )

    // let creatorsUrl = `${baseURL}creators?apikey=${Api}&offset=${offset}`;
    // fetch(creatorsUrl)
    //   .then(res => res.json()).then((results) => {
    //     // console.log('from homePage after ajax creators');
    //     // console.log(results);
    //
    //     this.setState({
    //         authors: results.data.results
    //     });
    //
    //     // document.getElementsByClassName('loading')[0].style.display = 'none';
    //     // document.getElementsByClassName('hp')[0].style.display = 'flex';
    //
    //     // console.log(this.state);
    //     }, (error) => {
    //         console.log(error);
    //     }
    // )

    let eventsUrl = `${baseURL}events?apikey=${Api}`;
    fetch(eventsUrl)
      .then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax events');
        // console.log(results);

        this.setState({
            events: results.data.results
        });

        // document.getElementsByClassName('loading')[0].style.display = 'none';
        // document.getElementsByClassName('hp')[0].style.display = 'flex';

        // console.log(this.state);
        }, (error) => {
            console.log(error);
        }
    )

    let seriesUrl = `${baseURL}series?apikey=${Api}&offset=${offset}`;
    fetch(seriesUrl)
      .then(res => res.json()).then((results) => {
        // console.log('from homePage after ajax series');
        // console.log(results);

        this.setState({
            series: results.data.results
        });

        // document.getElementsByClassName('loading')[0].style.display = 'none';
        // document.getElementsByClassName('hp')[0].style.display = 'flex';

        // console.log(this.state);
        }, (error) => {
            console.log(error);
        }
    )

    // let storiesUrl = `${baseURL}stories?apikey=${Api}&offset=${offset}`;
    // fetch(storiesUrl)
    //   .then(res => res.json()).then((results) => {
    //     // console.log('from homePage after ajax stories');
    //     // console.log(results);
    //
    //     this.setState({
    //         stories: results.data.results
    //     });
    //
    //     // document.getElementsByClassName('loading')[0].style.display = 'none';
    //     // document.getElementsByClassName('hp')[0].style.display = 'flex';
    //
    //     // console.log(this.state);
    //     }, (error) => {
    //         console.log(error);
    //     }
    // )

  }

  hover(e){

  }


  render() {
	// console.log(this.state);

    var comicsArr = this.state.comics;
    var comicsLength = comicsArr.length;
    var comic1 = '';

	var comic2 = ``;

    if(comicsLength == 20){
      var comic1Title = comicsArr[0].title;
      // console.log(comic1Title);
		comic1 = <MakeFeatured arr={comicsArr} url="/apps/marvel-comics#/comics/" id="true" number="0" title={comic1Title} />

		comic2 = <MakeFeatured arr={comicsArr} url="/apps/marvel-comics#/comics/" id="false" number="10" title="comics" />
  
    }


	var charactersArr = this.state.characters;
    var charactersLength = charactersArr.length;
    var character = '';
	var randomCharacter1 = Math.floor(Math.random() * Math.floor(20));
	var randomCharacter2 = Math.floor(Math.random() * Math.floor(20));
	//console.log(`random numbers`);
	//console.log(randomCharacter1, randomCharacter2);


    if(charactersLength == 20){

		character = <MakeFeatured arr={charactersArr} url="/apps/marvel-comics#/characters/" id="false" number="10" title="characters" />
		/*
		var bgURL1 = charactersArr[randomCharacter1].thumbnail.path + '.' + charactersArr[randomCharacter1].thumbnail.extension;
		var bgURL2 = charactersArr[randomCharacter2].thumbnail.path + '.' + charactersArr[randomCharacter1].thumbnail.extension;
		console.log(bgURL1,bgURL2);
		document.body.style.background = 'url('+ bgURL1 +') no-repeat top left /30%, url('+ bgURL2 +') no-repeat top right /30%, #000';
		*/
    }



	var seriesArr = this.state.series;
    var seriesLength = seriesArr.length;
    var series = '';

    if(seriesLength == 20){

		series = <MakeFeatured arr={seriesArr} url="/apps/marvel-comics#/series/" id="false" number="10" title="series" />

    }


	var eventsArr = this.state.events;
    var eventsLength = eventsArr.length;
    var event = '';

    if(eventsLength == 20){

		event = <MakeFeatured arr={eventsArr} url="/apps/marvel-comics#/events/" id="false" number="10" title="events" />

    }




    // if(this.state.comics !== undefined){
    //   var comicsArr = this.state.comics;
    //   var comicsLength = comicsArr.length;
    //
    //   var featured_1 = this.state.comics[0];
    //
    //   var featured_2 = this.state.comics[comicsLength -1];
    //
    //   console.log(comicsArr);
    //   console.log(comicsLength);
    //   console.log(featured_1);
    //   console.log(featured_2);
    // }


    let comics = ``;
    if(comicsLength == 20){
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

    // if(this.state.comics !== undefined){
    //   <a href="/#/comics/${featured_1.id}">
    //     <Image name={featured_1.title} href={featured_1.thumbnail.path} ext={featured_1.thumbnail.ext} size="portrait" />
    //   </a>
    // }


	if(comicsLength == 20 && charactersLength == 20 && seriesLength == 20 && eventsLength == 20) {

		document.getElementsByClassName('loading')[0].style.display = 'none';
		var hps = document.getElementsByClassName('hp');
		//console.log(hps);

		for (let val of hps) {
			//console.log(val);
			if(val.className == "hp top"){
				val.style.display = 'flex';
			} else {
				val.style.display = 'block';
			}
		}
	}


    return (
      <React.Fragment>
        <div className="hp top">
          <div className="featured featured_1">
			{comic1}
          </div>

          <div className="featured featured_2">

			<div>
				{comic2}
			</div>

			<div>
				{character}
			</div>

			<div>
				{series}
			</div>

			<div>
				{event}
			</div>

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

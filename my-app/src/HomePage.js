import React from 'react';
import { Api } from './Api';
import { List } from './List';

export class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

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
    console.log(this.state);
    // <List url='comic'  list={this.state.comics} />
    let comics = ``;
    if(this.state.comics !== undefined){
      comics =  <List url='comics' list={this.state.comics} />
    }

    let characters = ``;
    if(this.state.characters !== undefined){
      characters =  <List url='characters' list={this.state.characters} />
    }

    let series = ``;
    if(this.state.series !== undefined){
      series =  <List url='series' list={this.state.series} />
    }

    let events = ``;
    if(this.state.events !== undefined){
      events =  <List url='events' list={this.state.events} />
    }

    // let stories = ``;
    // if(this.state.stories !== undefined){
    //   stories =  <List url='stories' list={this.state.stories} />
    // }

    // let authors = ``;
    // if(this.state.authors !== undefined){
    //   authors =  <List url='authors' list={this.state.authors} />
    // }

    return (
      <React.Fragment>
        <div className="homepage">
          <h2>Comics</h2>
          {comics}
          <h2>Characters</h2>
          {characters}
          <h2>Series</h2>
          {series}
          <h2>Events</h2>
          {events}
        </div>
      </React.Fragment>
    );

  }
}

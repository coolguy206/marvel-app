import React from 'react';
import { Api } from './Api';
import { List } from './List';
import Image from './Image';
import { List2 } from './List2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
// import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';

export class PdpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
    this.changePdp = this.changePdp.bind(this);
  }

  componentDidMount() {
    let $this = this;
    let id  = this.props.match.params.Id;
    let cat  = this.props.match.params.Category;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

    // on page load data
    let dataURL = `${baseURL}/${id}?apikey=${Api}`;
    fetch(dataURL)
      .then(res => res.json()).then((results) => {
        // console.log(results);

        this.setState({
            data: results.data.results[0]
        });

        // document.getElementsByClassName('loading')[0].style.display = 'none';
        // document.getElementsByClassName('hp')[0].style.display = 'flex';

      }, (error) => {
        console.log(error);
    });

    if(cat !== 'characters' && cat !== 'creators'){
      //characters data
      let charactersURL = `${baseURL}/${id}/characters?apikey=${Api}`;
      fetch(charactersURL)
        .then(res => res.json()).then((results) => {
          // console.log(results);

          this.setState({
              characters: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'comics'){
      // comics data
      let comicsURL = `${baseURL}/${id}/comics?apikey=${Api} `;
      fetch(comicsURL)
        .then(res => res.json()).then((results) => {
          // console.log(results);

          this.setState({
              comics: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'events'){
      // events data
      let eventsURL = `${baseURL}/${id}/events?apikey=${Api} `;
      fetch(eventsURL)
        .then(res => res.json()).then((results) => {
          // console.log(results.data.results);

          this.setState({
              events: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'series' && cat !== 'comics'){
      // series data
      let seriesURL = `${baseURL}/${id}/series?apikey=${Api} `;
      fetch(seriesURL)
        .then(res => res.json()).then((results) => {
          // console.log(results.data.results);

          this.setState({
              series: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'stories'){
      // stories data
      let storiesURL = `${baseURL}/${id}/stories?apikey=${Api} `;
      fetch(storiesURL)
        .then(res => res.json()).then((results) => {
          // console.log(results.data.results);

          this.setState({
              stories: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'creators' && cat !== 'characters'){
      // creators data
      let creatorsURL = `${baseURL}/${id}/creators?apikey=${Api} `;
      fetch(creatorsURL)
        .then(res => res.json()).then((results) => {
          // console.log(results.data.results);

          this.setState({
              creators: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


  }

  handleClick(e) {

  }

  changePdp(e){

  }

  render() {
    console.log(this.state);
    let cat  = this.props.match.params.Category;
    // console.log(cat);

    let data = this.state.data;

    // console.log(data);

    if(data !== undefined){
      // console.log(data);

      let name = ``;
      if(cat == 'creators'){
        name = data.fullName;
      }else if(data.name !== undefined){
        name = data.name;
      } else if(data.title !== undefined){
        name = data.title;
      }

      let description = ``;
      if(data.description !== `` && data.description !== null){
        description = <p>{data.description}</p>
      }

      let comics = ``;
      if(this.state.comics !== undefined && this.state.comics.length !== 0){
        comics = <List2 header="comics" url="comics" list={this.state.comics}  />
      }

      let characters = ``;
      if(this.state.characters !== undefined && this.state.characters.length !== 0){
        characters = <List2 header="characters" url="characters" list={this.state.characters}  />
      }

      let events = ``;
      if(this.state.events !== undefined && this.state.events.length !== 0){
        events = <List2 header="events" url="events" list={this.state.events}  />
      }

      let series = ``;
      if(this.state.series !== undefined && this.state.series.length !== 0){
        series = <List2 header="series" url="series" list={this.state.series}  />
      }

      let stories = ``;
      if(this.state.stories !== undefined && this.state.stories.length !== 0){
        stories = <List2 header="stories" url="stories" list={this.state.stories}  />
      }

      let creators = ``;
      if(this.state.creators !== undefined && this.state.creators.length !== 0){
        creators = <List2 header="creators" url="creators" list={this.state.creators}  />
      }



      return (
        <React.Fragment>
          <div className="pdp">
            <h1>{name}</h1>
            <Image name={name} href={data.thumbnail.path} ext={data.thumbnail.extension} size='portrait'  />
            {description}

            {comics}

            {characters}

            {events}

            {series}

            {stories}

            {creators}

          </div>
        </React.Fragment>
      );

    } else {
      return null;
    }


  } //end of render
}

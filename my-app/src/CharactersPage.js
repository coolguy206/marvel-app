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

export class CharactersPage extends React.Component {

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
    let baseURL = `http://gateway.marvel.com/v1/public/characters`;

    //character data
    let characterURL = `${baseURL}/${id}?apikey=${Api}`;
    fetch(characterURL)
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

    //character comics data
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

    //character events data
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

    //character series data
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

    //character stories data
    // let storiesURL = `${baseURL}/${id}/stories?apikey=${Api} `;
    // fetch(storiesURL)
    //   .then(res => res.json()).then((results) => {
    //     console.log(results.data.results);
    //
    //     this.setState({
    //         stories: results.data.results
    //     });
    //
    //     // document.getElementsByClassName('loading')[0].style.display = 'none';
    //     // document.getElementsByClassName('hp')[0].style.display = 'flex';
    //
    //   }, (error) => {
    //     console.log(error);
    // });

  }

  handleClick(e) {

  }

  changePdp(e){

  }

  render() {
    console.log(this.state);
    if(this.state.data !== undefined){
      let data = this.state.data;
      // console.log(data);

      let name = data.name;

      let comics = ``;
      if(this.state.comics !== undefined){
        comics = <List2 header="comics" url="comics" list={this.state.comics}  />
      }

      let events = ``;
      if(this.state.events !== undefined){
        events = <List2 header="events" url="events" list={this.state.events}  />
      }

      let series = ``;
      if(this.state.series !== undefined){
        series = <List2 header="series" url="series" list={this.state.series}  />
      }


      return (
        <React.Fragment>
          <div className="pdp">
            <h1>{name}</h1>
            <Image name={name} href={data.thumbnail.path} ext={data.thumbnail.extension} size='portrait'  />

            {comics}

            {events}

            {series}

          </div>
        </React.Fragment>
      );

    } else {
      return null;
    }


  } //end of render
}

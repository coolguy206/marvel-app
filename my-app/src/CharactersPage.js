import React from 'react';
import { Api } from './Api';
import { List } from './List';
import Image from './Image';
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
      comics: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.changePdp = this.changePdp.bind(this);
  }

  componentDidMount() {
    let $this = this;
    let id  = this.props.match.params.Id;
    let baseURL = `http://gateway.marvel.com/v1/public/`;

    let url = `${baseURL}characters/${id}?apikey=${Api}`;
    // console.log(url);
    fetch(url)
      .then(res => res.json()).then((results) => {
        // console.log('from pdp page after ajax');
        // console.log(results);

        this.setState({
            data: results.data.results[0]
        });

        // {
        // series: {
        //   thumb: resulting.data.results[0].thumbnail.path,
        //   ext: resulting.data.results[0].thumbnail.extension
        // }

        let comicsArr = [];
        let comics = results.data.results[0].comics.items;
        comics.map(function(val, i){
          // console.log(val.resourceURI);
          return fetch(`${val.resourceURI}?apikey=${Api}`).then(res => res.json()).then((resulting) => {
               // console.log('from pdp page after ajax');
               // console.log(resulting);
               var thumb = resulting.data.results[0].thumbnail;
               comicsArr.push(thumb);

               }, (error) => {
                   console.log(error);
           });

        });

        // console.log(comicsArr);
        this.setState((state, prop) => {
            // console.log(state.comics.length);
            if(state.comics.length == 0){
              // console.log('no comics match');
              state.comics = comicsArr;
            }
            // console.log(state.comics);
            // console.log(state.comics.length);
        });



        // document.getElementsByClassName('loading')[0].style.display = 'none';
        // document.getElementsByClassName('hp')[0].style.display = 'flex';

        // console.log(this.state);
        }, (error) => {
            console.log(error);
        }
    )



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

      // let comicsList = data.comics.items;
      // comicsList = comicsList.map(function(val, i){
      //   let href = val.resourceURI;
      //   href = href.split('comics/')[1];
      //   href = `/apps/marvel-comics#/comics/${href}`
      //   return(
      //     <li key={i}>
      //       <a href={href}>
      //         <h3>{val.name}</h3>
      //       </a>
      //     </li>
      //   )
      // });

      let comicsList = this.state.comics;
      console.log(comicsList[0]);
      comicsList.map(function(val, i){
        console.log(val);
      });

      let eventsList = data.events.items;
      eventsList = eventsList.map(function(val, i){
        let href = val.resourceURI;
        href = href.split('events/')[1];
        href = `/apps/marvel-comics#/events/${href}`
        return(
          <li key={i}>
            <a href={href}>
              <h3>{val.name}</h3>
            </a>
          </li>
        )
      });

      let seriesList = data.series.items;
      seriesList = seriesList.map(function(val, i){
        let href = val.resourceURI;
        href = href.split('series/')[1];
        href = `/apps/marvel-comics#/series/${href}`
        return(
          <li key={i}>
            <a href={href}>
              <h3>{val.name}</h3>
            </a>
          </li>
        )
      });

      let storiesList = data.stories.items;
      storiesList = storiesList.map(function(val, i){
        let href = val.resourceURI;
        href = href.split('stories/')[1];
        href = `/apps/marvel-comics#/stories/${href}`
        return(
          <li key={i}>
            <a href={href}>
              <h3>{val.name}</h3>
            </a>
          </li>
        )
      });



      return (
        <React.Fragment>
          <div className="pdp">
            <h1>{name}</h1>
            <Image name={name} href={data.thumbnail.path} ext={data.thumbnail.extension} size='portrait'  />

            <h2>comics</h2>
            <ul>

            </ul>

            <h2>events</h2>
            <ul>
              {eventsList}
            </ul>

            <h2>series</h2>
            <ul>
              {eventsList}
            </ul>

            <h2>stories</h2>
            <ul>
              {storiesList}
            </ul>

          </div>
        </React.Fragment>
      );

    } else {
      return null;
    }


  } //end of render
}

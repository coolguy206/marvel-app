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

export class ComicsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // variants: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.changePdp = this.changePdp.bind(this);
  }

  componentDidMount() {
    let $this = this;
    let id  = this.props.match.params.Id;
    let baseURL = `http://gateway.marvel.com/v1/public/comics`;

    //comic book
    let comicURL = `${baseURL}/${id}?apikey=${Api}`;
    fetch(comicURL).then(res => res.json()).then((results) => {
      // console.log(results);

      this.setState({
          data: results.data.results[0],
      });

      // document.getElementsByClassName('loading')[0].style.display = 'none';
      // document.getElementsByClassName('hp')[0].style.display = 'flex';

      }, (error) => {
        console.log(error);
    });

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

      let title = data.title;
      let description = data.description;
      if(description !== "" && description !== null){
        description = <p>{description}</p>;
      }

      let imagesList = data.images;
      imagesList = imagesList.map(function(val,i){
        return(
          <li key={i}>
            <Image name={title} href={val.path} ext={val.extension} size='portrait' />
          </li>
        )
      });

      // let stories
      let storiesList = data.stories.items;
      if(storiesList !== undefined){
        storiesList = storiesList.map(function(val, i){
          let href = val.resourceURI;
          href = href.split('stories/')[1];
          href = `/apps/marvel-comics#/stories/${href}`
          return(
            <li key={i}>
              <a href={href}>
                <h2>{val.name}</h2>
              </a>
            </li>
          )
        });
      }



      // this.state.stories.map(function(val, i){
      //   console.log(val.resourceURI);
      //   let url = `${val.resourceURI}?apikey=${Api}`;
      //   // console.log(url);
      //   fetch(url).then(res => res.json()).then((results) => {
      //       // console.log('from pdp page after ajax');
      //       console.log(results);
      //
      //
      //       // document.getElementsByClassName('loading')[0].style.display = 'none';
      //       // document.getElementsByClassName('hp')[0].style.display = 'flex';
      //
      //       // console.log(this.state);
      //       }, (error) => {
      //           console.log(error);
      //   });
      //
      // });


      // if(this.state.variants !== undefined){
      //   let theVariants = this.state.variants;
      //   console.log(theVariants.length);
      //
      //   this.state.variants.map(function(val, i){
      //     console.log(i, val);
      //     let href = `/apps/marvel-comics#/comics/${val.id}`;
      //     let title = val.title;
      //     return(
      //       <li key={i}>
      //         <a href={href}>
      //           <Image name={title} href={val.thumb.path} ext={val.thumb.extension} size='portrait' />
      //         </a>
      //       </li>
      //     )
      //   });
      // }


      // if(theVariants.length > 0){
        // let variantsList = theVariants.map(function(val, i){
        //   console.log(i, val);
        //   let href = `/apps/marvel-comics#/comics/${val.id}`;
        //   let title = val.title;
        //   return(
        //     <li key={i}>
        //       <a href={href}>
        //         <Image name={title} href={val.thumb.path} ext={val.thumb.extension} size='portrait' />
        //       </a>
        //     </li>
        //   )
        // });
      // }



      let creatorsList = data.creators.items;
      creatorsList = creatorsList.map(function(val, i){
        let href = val.resourceURI;
        href = href.split('creators/')[1];
        href = `/apps/marvel-comics#/creators/${href}`
        return(
          <li key={i}>
            <a href={href}>
              <h2>{val.name}</h2>
              <h3>{val.role}</h3>
            </a>
          </li>
        )
      });

      var series = ``;
      if(this.state.series !== undefined){
        series = <a href="/apps/marvel-comics#/series/"><Image name='yo' href={this.state.series.thumb} ext={this.state.series.ext} size='portrait' /></a>;
      }


      return (
        <React.Fragment>
          <div className="pdp">
            <h1>{title}</h1>
            <Image name={title} href={data.thumbnail.path} ext={data.thumbnail.extension} size='portrait'  />
            {description}
            <h3>Issue #{data.issueNumber}</h3>
            <p>page count: {data.pageCount}</p>

            <h2>images</h2>
            <ul>
              {imagesList}
            </ul>

            <h2>Series</h2>
            {series}

            <h2>Variants</h2>
            <ul>

            </ul>

            <h2>stories</h2>
            <ul>
              {storiesList}
            </ul>

            <h2>creators</h2>
            <ul>
              {creatorsList}
            </ul>

          </div>
        </React.Fragment>
      );

    } else {
      return null;
    }


  } //end of render
}

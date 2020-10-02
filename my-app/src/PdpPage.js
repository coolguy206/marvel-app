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

export class PdpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
    this.changePdp = this.changePdp.bind(this);
  }

  componentDidMount() {
    let id  = this.props.match.params.Id;
    // let cat = this.props.match.params.Category;

    // var offset = Math.floor(Math.random() * 900);
    let baseURL = `http://gateway.marvel.com/v1/public/characters`;

    let url = `${baseURL}/${id}?apikey=${Api}`;
    // console.log(url);
    fetch(url)
      .then(res => res.json()).then((results) => {
        // console.log('from pdp page after ajax');
        // console.log(results);

        this.setState({
            data: results.data.results[0]
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
    if(this.state.data !== undefined){
      let data = this.state.data;
      console.log(data);

      let title = data.title;
      let description = data.description;
      if(description !== "" && description !== null){
        description = <p>{description}</p>;
      }
      let pageCount = data.pageCount;

      let creators = ``;
      if(data.creators !== undefined){
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

        // creators = return(<h2>creators</h2><ul>{creatorsList}</ul>);
      }





      let images = data.images;
      console.log(images);




      return (
        <React.Fragment>
          <div className="pdp">
            <h1>{title}</h1>
            <Image name={title} href={data.thumbnail.path} ext={data.thumbnail.extension} size='portrait'  />
            {description}
            <p>page count: {pageCount}</p>
            <h2>images</h2>


          </div>
        </React.Fragment>
      );

    } else {
      return null;
    }


  } //end of render
}

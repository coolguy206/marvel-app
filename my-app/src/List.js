import React from 'react';
import Image from './Image';

export class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.hover = this.hover.bind(this);
  }

  hover(e){

  }

  render() {
    let baseURL = this.props.url;
    let listItems = this.props.list;
    let li = listItems.map(function(val, i){

      // if(path.indexOf(`image_not_available`) == -1){
      let href = `/apps/marvel-comics#/${baseURL}/${val.id}`;
      let name = ``;
      if(baseURL == 'creators'){
        name = val.fullName;
      } else if(val.name !== undefined){
        name = val.name;
      } else if(val.title !== undefined){
        name = val.title;
      }

        if(val.id !== undefined){

          return(
            <li key={i}>
              <a href={href}>
                <Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}  />
                <h2>{name}</h2>
              </a>
            </li>
          )

        } else {

          return(
            <li>
              <Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}  />
              <h2>{name}</h2>
            </li>
          )

        }

      // }

    });

    return (
      <React.Fragment>
        <ul>
          {li}
        </ul>
      </React.Fragment>
    );

  }
}

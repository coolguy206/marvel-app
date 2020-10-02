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
      let path = val.thumbnail.path;
      if(path.indexOf(`image_not_available`) == -1){

        if(val.id !== undefined){

          let href = `/apps/marvel-comics#/${baseURL}/${val.id}`;
          let name = ``;
          if(val.name !== undefined){
            name = val.name;
          } else if(val.title !== undefined){
            name = val.title;
          }

          return(
            <li key={i}>
              <a href={href}>
                <Image name={name} href={path} size="portrait" ext={val.thumbnail.extension}  />
                <h2>{name}</h2>
              </a>
            </li>
          )

        } else {

          let name = ``;
          if(val.name !== undefined){
            name = val.name;
          } else if(val.title !== undefined){
            name = val.title;
          }

          return(
            <li>
              <Image name={name} href={path} size="portrait" ext={val.thumbnail.extension}  />
              <h2>{name}</h2>
            </li>
          )

        }


      }

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

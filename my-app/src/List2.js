import React from 'react';
import Image from './Image';

export class List2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let header = this.props.header;
    let baseURL = this.props.url;
    let listItems = this.props.list;
    let li = listItems.map(function(val, i){
      // stories
      if(header === 'stories'){
        let href = `/apps/marvel-comics#/${baseURL}/${val.id}`;
        let name = val.title;

        return(<li key={i}><a href={href}><h2>{name}</h2></a></li>)

      } else if(val.thumbnail !== undefined && val.thumbnail !== null ){
        // let path = val.thumbnail.path;
        // if(path.indexOf(`image_not_available`) == -1){
        let name = ``;
        if(val.id !== undefined){
          let href = `/apps/marvel-comics#/${baseURL}/${val.id}`;
          //creators
          if(header === 'creators'){
            name = val.fullName;

            return(<li key={i}><a href={href}><Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}  /><h2>{name}</h2></a></li>)

          } else if(header === 'comics'){
            //comics
            name = val.title;

            return(<li key={i}><a href={href}><Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}  /><h2>{name}</h2><span>Pages: {val.pageCount}</span></a></li>)

          } else if(header === 'series' || header === 'events'){
            //series
            name = val.title;
            let description = ``;
            if(val.description !== "" && val.description !== null){
              description = <p>{val.description}</p>
            }

            return(<li key={i}><a href={href}><Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}  /><h2>{name}</h2>{description}</a></li>)

          } else {
            if(val.name !== undefined){
              name = val.name;
            } else if(val.title !== undefined){
              name = val.title;
            }

            return(<li key={i}><a href={href}><Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}  /><h2>{name}</h2></a></li>)

          }
        } else {
          let name = ``;
          if(val.name !== undefined){
            name = val.name;
          } else if(val.title !== undefined){
            name = val.title;
          }

          return(<li key={i}><Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}/><h2>{name}</h2></li>)

        }
      }
    });

    return (
      <React.Fragment>
        <h2>{header}</h2>
        <ul>{li}</ul>
      </React.Fragment>
    );
  }
}

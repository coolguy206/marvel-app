import React from 'react';
import Image from './Image';
import Slider from "react-slick";

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
	let slider = this.props.slider;
	var elem = ``;
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
			
		//<h2>{name}</h2>

          return(
            <li key={i}>
              <a href={href}>
                <Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}  />
               
              </a>
            </li>
          )

        } else {

          return(
            <li>
              <Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension}  />
             
            </li>
          )

        }

      // }

    });
	
	var settings = {
    infinite: true,
	autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
	arrows: false,
	autoplay:true,
	dots: false,
	centerMode:true,
	responsive: [
	{
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
		//centerMode: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
		//centerMode: true
      }
    },
	{
      breakpoint: 414,
      settings: {
        slidesToShow: 1,
		//centerMode: true
      }
    },
	]
  };
  
  if(slider == 'true'){
	  elem = <ul>
				<Slider {...settings}>
					{li}
				</Slider>
			</ul>
  } else {
	elem = <ul>
	{li}
</ul>	
	
  }

    return (
      <React.Fragment>
        
          {elem}
        
      </React.Fragment>
    );

  }
}

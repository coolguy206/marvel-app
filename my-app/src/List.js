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
	let changePdp = this.props.changePdp;

	//console.log('List.js changePdp');
	//console.log(changePdp);

	let elem = ``;
	let href = ``;
	let name = ``;

    let li = listItems.map(function(val, i){


    if(baseURL == 'creators' || baseURL == 'stories'){
		//console.log("pdp page creators");
        name = val.name;
        // console.log(name);
        if(name == undefined){
          name = val.fullName;
        }
		//console.log(name);
		href = val.resourceURI;
		href = href.split('/');
		let hrefLength = href.length;
		let id = href[hrefLength -1];
		href = `/apps/marvel-comics#/${baseURL}/${id}`;
		let role = val.role;
    // console.log(role);
		if(role !== undefined){
			role = `- ` + role;
		} else {
			role = ``;
		}
		//console.log(href);
		return (
			<li key={i}>
				<a href={href} onClick={changePdp}>{name} {role}</a>
			</li>
		)
    }



	else if(baseURL == 'comics' || baseURL == 'characters' || baseURL == 'series' || baseURL == 'events'){
		//console.log('pdp page comics');
		href = `/apps/marvel-comics#/${baseURL}/${val.id}`;
		name = val.name;
		if(name == undefined){
			name = val.title;
		}

		if(val.thumbnail !== undefined){
			if(val.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"){

				if(val.id !== undefined){

					return(
						<li key={i}>
							<a href={href} onClick={changePdp}>
								<Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension} />
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

			}
		} else {
			href = val.resourceURI;
			href = href.split('/');
			let hrefLength = href.length;
			let id = href[hrefLength -1];
			href = `/apps/marvel-comics#/${baseURL}/${id}`;

			return (
			<li key={i}>
				<a href={href} onClick={changePdp}>{name}</a>
			</li>
		)

		}
	}


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

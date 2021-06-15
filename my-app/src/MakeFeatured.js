import React from 'react';
import Image from './Image';

export default class MakeFeatured extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
	//console.log(`from MakeFeatured`);
    //console.log(this.props.arr);

	var title = this.props.title;
	var baseURL = this.props.url;
    var arr = this.props.arr;
	var num = Number(this.props.number);
	var id = this.props.id;

	//console.log(`title`);
	//console.log(title);

    //var arrLength = arr.length;

	if(title === 'comics'){
		if(num === 20){
			num = num - 1;
		} else if(num === 0){
			num = num + 2;
		}else {
			num = num + 1;
		}
	}

  var featured = ``;
	var featuredImg =``;
	var featuredURL = baseURL;
	featured = arr[num];


	var featuredImgURL = featured.thumbnail.path;
	if(featuredImgURL === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
		featured = arr[num +1];
		featuredImgURL = featured.thumbnail.path;
	}

	featuredImg =  <Image name={featured.title} href={featuredImgURL} ext={featured.thumbnail.extension} size="portrait_uncanny" />

	var featuredStyle = {
		backgroundImage: `url(${featuredImgURL}.${featured.thumbnail.extension})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`
	};
	// console.log(featuredStyle);

	if(id === "true"){
		featuredURL = baseURL + featured.id;
	} else {
		featuredURL = baseURL;
	}

    return (
      <React.Fragment>
		<h2>{title}</h2>
		<a href={featuredURL} style={featuredStyle}>
			{featuredImg}
		</a>
      </React.Fragment>
    );
  }
}

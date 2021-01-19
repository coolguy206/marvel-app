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
	var num = this.props.number;
	var id = this.props.id;
	
	//console.log(`num`);
	//console.log(num);
	
    var arrLength = arr.length;
 
    var featured = ``;
	var featuredImg =``;
	var featuredURL = baseURL;
	
	featured = arr[num];
	  
	featuredImg =  <Image name={featured.title} href={featured.thumbnail.path} ext={featured.thumbnail.extension} size="portrait_uncanny" />
	
	if(id == "true"){
	  
		featuredURL = baseURL + featured.id;
	
	} else {
		
		featuredURL = baseURL;
		
	}
	  
    return (
      <React.Fragment>
		
			<a href={featuredURL}>
				<h2>{title}</h2>
				{featuredImg}
			</a>
		
      </React.Fragment>
    );

  }
}

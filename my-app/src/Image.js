import React from 'react';

export default class Image extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sizes: [
        {name: `portrait`, value: `portrait_uncanny`}, 	//300x450px
        {name: `standard`, value: `standard_fantastic`}, 	//250x250px
        {name: `landscape`, value : `landscape_incredible`}, //464x261px
      ]
    };
    this.hover = this.hover.bind(this);
  }

  hover(e){

  }

  render() {
    var alt = this.props.name;
    var src = this.props.href;

    var size = this.props.size;
    var sizesArr = this.state.sizes;
    sizesArr.map(function(val, i){
      // console.log(i,val);
      if(val.name == size){
        size = val.value;
      }
    })

    var ext =  this.props.ext;
    var href = `${src}/${size}.${ext}`;

    return (
      <React.Fragment>
        <img src={href} alt={alt} title={alt}/>
      </React.Fragment>
    );

  }
}

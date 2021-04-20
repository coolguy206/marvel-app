import React from 'react';
import { Api } from './Api';
import { List } from './List';

export class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.hover = this.hover.bind(this);
    // this.changeLanding = this.changeLanding.bind(this);
  }

  componentDidMount() {

    var offset = Math.floor(Math.random() * 900);
    let cat  = this.props.match.params.Category;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

    let url = ``;
    if(cat !== 'stories'){
      if(cat !== 'events'){
        url = `${baseURL}?apikey=${Api}&offset=${offset}`;
      } else {
        url = `${baseURL}?apikey=${Api}`;
      }

      fetch(url)
        .then(res => res.json()).then((results) => {
          // console.log('from homePage after ajax comics');
          // console.log(results);

          this.setState({
              data: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

          // console.log(this.state);
          }, (error) => {
              console.log(error);
      });

    }



  }
/*
  changeLanding(e){
		console.log(`landing changeLanding`);
		//console.log(e);
		//console.log(e.target);

		let url = e.target.href;
		let urlArr = url.split('/');
		let cat = urlArr[urlArr.length - 2];
		let id = urlArr[urlArr.length -1];
		//console.log(url, urlArr, cat, id);


		let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

		// on page load data
		let dataURL = `${baseURL}/${id}?apikey=${Api}`;
		fetch(dataURL).then(res => res.json()).then((results) => {
			console.log(results);

			// this.setState({
			// 	data: results.data.results[0]
			// });

		}, (error) => {
			console.log(error);
		});
	}
*/
  hover(e){

  }

  render() {
    console.log(this.state);
    let cat  = this.props.match.params.Category;
    // <List url='comic'  list={this.state.comics} />
    let data = ``;
    if(this.state.data !== undefined){
      data =  <List url={cat} list={this.state.data} />
    }

    //document.getElementsByClassName('landing-page')[0].style.display = 'block';
    var landing =  document.getElementsByClassName('landing-page')[0];
    if(landing !== undefined){
      landing.style.display = 'block';
    }
    var loading = document.getElementsByClassName('loading')[0];
    if(loading !== undefined){
      loading.style.display = 'none';
    }

    return (
      <React.Fragment>
        <div className="landing-page">
          <h1>{cat}</h1>
          {data}
        </div>
      </React.Fragment>
    );

  }
}

import React from 'react';
import { Api } from './Api';
import Image from './Image';
import { List } from './List';
import {Loading} from './Loading';

export class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 20,
    };
    this.hover = this.hover.bind(this);
    this.getMore = this.getMore.bind(this);
    // this.changeLanding = this.changeLanding.bind(this);
  }

  componentDidMount() {

    // var offset = Math.floor(Math.random() * 900);
    let cat  = this.props.match.params.Category;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

    let url = ``;
    // if(cat !== 'stories'){
    //   if(cat !== 'events'){
    //     url = `${baseURL}?apikey=${Api}&offset=${offset}`;
    //   } else {
    //     url = `${baseURL}?apikey=${Api}`;
    //   }

    url = `${baseURL}?apikey=${Api}`

      fetch(url)
        .then(res => res.json()).then((results) => {
          console.log('from landing page after ajax');
          console.log(results);

          var offset = this.state.offset + results.data.offset;
          console.log(typeof offset);

          this.setState({
              data: results.data.results,
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

          // console.log(this.state);
          }, (error) => {
              console.log(error);
      });

    // }

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
  getMore(e){
    console.log(`getMore function`);
    var offset = this.state.offset;
    let cat  = this.props.match.params.Category;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

    let url = ``;

    url = `${baseURL}?apikey=${Api}&offset=${offset}`;

      fetch(url)
        .then(res => res.json()).then((results) => {
          console.log('ajax from button click landing page');
          console.log(results);

          var offset = this.state.offset + results.data.offset;
          console.log(offset);

          var data = this.state.data;
          console.log(data);

          var ajaxData = results.data.results;
          ajaxData.map(function(val,i){
            data.push(val);
          })

          console.log(data);

          this.setState({
              data: data,
              offset: offset
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

          // console.log(this.state);
          }, (error) => {
              console.log(error);
      });

  }

  hover(e){

  }

  render() {
    console.log(this.state);
    // console.log(document.getElementById('logo').dataset.arr);
    // var arr = document.getElementById('logo').dataset.arr;

    let data = ``;
    let li =``;
    let cat  = this.props.match.params.Category;
    if(this.state.data !== undefined){
      // data =  <List url={cat} list={this.state.data} />
      var listItems = this.state.data;
      li = listItems.map(function(val, i){
        let id = val.id;
        let href = `/apps/marvel-comics#/${cat}/${id}`;
        let name = val.name;

        return(
          <li key={i}>
            <a href={href}>
              <h2>{name}</h2>
              <Image name={name} href={val.thumbnail.path} size="portrait" ext={val.thumbnail.extension} />
            </a>
          </li>
        )

      });



    }


    // if(arr !== ''){
    //   arr = JSON.parse(arr);
    //   console.log(arr);
    //   data =  <List url={cat} list={arr} />
    // } else {
    //   if(this.state.data !== undefined){
    //     data =  <List url={cat} list={this.state.data} />
    //   }
    // }

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
          <ul>
            {li}
          </ul>
          <button onClick={this.getMore}>load more</button>
          <Loading />
        </div>
      </React.Fragment>
    );

  }
}

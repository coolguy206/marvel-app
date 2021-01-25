import React from 'react';
import { Api } from './Api';
import { List } from './List';
import Image from './Image';
import { List2 } from './List2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
// import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';

export class PdpPage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data: {},
		};
		this.handleClick = this.handleClick.bind(this);
		this.changePdp = this.changePdp.bind(this);
	}

	componentDidMount() {
		let $this = this;
		let id  = this.props.match.params.Id;
		let cat  = this.props.match.params.Category;
		let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

		// on page load data
		let dataURL = `${baseURL}/${id}?apikey=${Api}`;
		fetch(dataURL).then(res => res.json()).then((results) => {
			// console.log(results);

			this.setState({
				data: results.data.results[0]
			});

		}, (error) => {
			console.log(error);
		});
	}
	
/*
    if(cat !== 'characters' && cat !== 'creators'){
      //characters data
      let charactersURL = `${baseURL}/${id}/characters?apikey=${Api}`;
      fetch(charactersURL)
        .then(res => res.json()).then((results) => {
          // console.log(results);

          this.setState({
              characters: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'comics'){
      // comics data
      let comicsURL = `${baseURL}/${id}/comics?apikey=${Api} `;
      fetch(comicsURL)
        .then(res => res.json()).then((results) => {
          // console.log(results);

          this.setState({
              comics: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'events'){
      // events data
      let eventsURL = `${baseURL}/${id}/events?apikey=${Api} `;
      fetch(eventsURL)
        .then(res => res.json()).then((results) => {
          // console.log(results.data.results);

          this.setState({
              events: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'series' && cat !== 'comics'){
      // series data
      let seriesURL = `${baseURL}/${id}/series?apikey=${Api} `;
      fetch(seriesURL)
        .then(res => res.json()).then((results) => {
          // console.log(results.data.results);

          this.setState({
              series: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'stories'){
      // stories data
      let storiesURL = `${baseURL}/${id}/stories?apikey=${Api} `;
      fetch(storiesURL)
        .then(res => res.json()).then((results) => {
          // console.log(results.data.results);

          this.setState({
              stories: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }


    if(cat !== 'creators' && cat !== 'characters'){
      // creators data
      let creatorsURL = `${baseURL}/${id}/creators?apikey=${Api} `;
      fetch(creatorsURL)
        .then(res => res.json()).then((results) => {
          // console.log(results.data.results);

          this.setState({
              creators: results.data.results
          });

          // document.getElementsByClassName('loading')[0].style.display = 'none';
          // document.getElementsByClassName('hp')[0].style.display = 'flex';

        }, (error) => {
          console.log(error);
      });
    }
	
*/


	handleClick(e) {

	}
 

	changePdp(e){

	}


	render() {
	 
		console.log(this.state.data);
		let img =``;
		let data = ``;
		let title = ``;
		let desc = ``;
		let pageCount = ``;
		let issue =``;
		let urls =``;
		
		let comics = ``;
		let comicsList = ``;
		
		let events = ``;
		let eventsList = ``;
	
		let stories = ``;
		let storiesList = ``;
	
		let series = ``;
		let seriesList = ``;
	
		let creators = ``;
		let creatorsList = ``;
	
		let li = ``;
	
	
		if(this.state.data.id !== undefined) {
			//console.log('empty data');
	
			let cat  = this.props.match.params.Category;
			// console.log(cat);
	
			data = this.state.data;
	
			title =  data.title;
			if(title == undefined) {
				title = data.name;
			}
	
			desc =  data.description;
			if (desc !== null) {
				desc = <p>{desc}</p>
			}
	
			if(data.pageCount !== undefined){
				pageCount = <p>Pages: {data.pageCount}</p>;
			}
			
			if(data.issueNumber !== undefined){
				issue = <p>Issue # {data.issueNumber}</p>;
			}
	
	
			img = <Image name={data.title} href={data.thumbnail.path} ext={data.thumbnail.extension} size='portrait'  />
	
			urls = data.urls;
	
			if(urls.length == 1){
				urls = <a href={data.urls[0].url} target="_blank">learn more</a>
			} else {
				li = urls.map(function(val, i){
					return(
						<li key={i}><a href={val.url} target="_blank">{val.type}</a></li>
					)
				});
				urls = <ul>{li}</ul>
			}
	
			if(data.creators !== undefined){
				creators = <h2>creators</h2>
				creatorsList = <List url="creators" list={data.creators.items} slider="false" />
			}
			
			if(data.comics !== undefined){
				comics = <h2>comics</h2>
				comicsList = <List url="comics" list={data.comics.items} slider="false" />
			}
			
			if(data.events !== undefined && data.events.length > 0){
				events = <h2>events</h2>
				eventsList = <List url="events" list={data.events.items} slider="false" />
			}
	
	
	
			stories = <h2>Stories</h2>
			storiesList = <ul><List url="stories" list={data.stories.items} slider="false" /></ul>
	
			if(data.series.available == 0){
				console.log('pdp series do nothing');
			} else if(data.series.available == 1 || data.series.available == undefined){
				console.log('pdp 1 series');
				let seriesHref = data.series.resourceURI;
				seriesHref = seriesHref.split('/');
				let seriesHrefLength = seriesHref.length;
				let seriesId = seriesHref[seriesHrefLength -1];
				seriesHref = `/apps/marvel-comics#/series/${seriesId}`;
				series = <h2>series</h2>
				seriesList = <a href={seriesHref}>{data.series.name}</a>
			
			} else {
				series = <h2>series</h2>
				seriesList = <List url="series" list={data.series.items} slider="false" />
			}
	
			document.getElementsByClassName('loading')[0].style.display = 'none';
			var pdpPage = document.getElementsByClassName('pdp');
			pdpPage[0].style.display = 'flex';


		} // end of if
	

		return (
			<React.Fragment>
				<div className="pdp">
		  
					<div className="first">
						<h1 className="mobile">{title}</h1>
						{img}
					</div>
			
					<div className="second">
						<h1 className="desktop">{title}</h1>
						{desc}
						{issue}
						{pageCount}
						{urls}
						
						{comics}
						{comicsList}
						
						{events}
						{eventsList}
						
						{series}
						{seriesList}
						
						{creators}
						{creatorsList}
					
					</div>
			
				</div>
			</React.Fragment>
		);



  } //end of render
}

import React from 'react';
import { Api } from './Api';
import { List } from './List';
import Image from './Image';
import { List2 } from './List2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setStorage } from './SetStorage';
import { Fetch } from './Fetch';
import { RemoveDuplicates } from './RemoveDuplicates';
import {setObj} from './SetObj.js'

export class PdpPage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data: {},
			characters: [],
			comics: [],
			events:[],
			series:[],
			stories:[],
			creators:[]
		};
		this.handleClick = this.handleClick.bind(this);
		this.changePdp = this.changePdp.bind(this);
		this.getInfo = this.getInfo.bind(this);
	}

	componentDidMount() {
		var localStorageComics = window.localStorage.getItem("comics");
		localStorageComics = JSON.parse(localStorageComics);
		var localStorageCharacters = window.localStorage.getItem("characters");
		localStorageCharacters = JSON.parse(localStorageCharacters);
		var localStorageEvents = window.localStorage.getItem("events");
		localStorageEvents = JSON.parse(localStorageEvents);
		var localStorageSeries = window.localStorage.getItem("series");
		localStorageSeries = JSON.parse(localStorageSeries);
		var localStorageCreators = window.localStorage.getItem("creators");
		localStorageCreators = JSON.parse(localStorageCreators);
		var localStorageStories = window.localStorage.getItem("stories");
		localStorageStories = JSON.parse(localStorageStories);

		let theData = ``;
		let data = ``;
		let $this = this;
		let id  = this.props.match.params.Id;
		let cat  = this.props.match.params.Category;
		let baseURL = `http://gateway.marvel.com/v1/public/${cat}/${id}?apikey=${Api}`;

		/*switch(cat){
      case 'comics':
        if(localStorageComics == null){
          console.log(`PdpPage.js local storage null`);
          Fetch(baseURL, 'comics').then((results) => {
						console.log(results);
						data = results.data.results[0];
						this.setState({
							data: data,
							creators: data.creators.items
						});
          });
        } else {
			*/
          console.log(`PdpPage.js local storage not null`);
					if(cat == 'comics'){
						theData = setStorage('comics');
					} else if(cat == 'characters'){
							theData = setStorage('characters');
					} else if(cat == 'events'){
							theData = setStorage('events');
					} else if(cat == 'series'){
							theData = setStorage('series');
					} else if(cat == 'creators'){
							theData = setStorage('creators');
					}

					console.log(id);
					// console.log(theData);

					//find ID
					for(var i = 0; i<theData.data.length; i++){
						if(theData.data[i].id == id){
							// console.log(`match`);
							// console.log(theData.data[i]);
							data = theData.data[i];
							break;
						}
					}

					this.setState({
						data: data,
						// creators: data.creators.items
					});

					/*
					if(data == ``){
						console.log(`no matches`);
						fetch(baseURL).then(res => res.json()).then((results) => {
							// console.log(results);
							data = results.data.results[0];
							// console.log(data);

							// localStorageComics = JSON.parse(localStorageComics);
							// console.log(localStorageComics);
							localStorageComics.data.push(data);
							// console.log(localStorageComics);

							//remove duplicates
							localStorageComics.data = Array.from(new Set(localStorageComics.data.map(a => a.id))).map(id => {
						    return localStorageComics.data.find(a => a.id === id)
						  });

							localStorageComics = JSON.stringify(localStorageComics);
							// console.log(localStorageComics);
							localStorage.setItem("comics", localStorageComics);
							localStorageComics = JSON.parse(localStorageComics);

							this.setState({
								data: data,
								creators: data.creators.items
							});

						}, (error) => {
							console.log(error);
						});
					} else {
					*/
						console.log(`we have matches`);

						// var dataCharacters = data.characters.items;
						var dataCharacters = ``;
						var dataEvents = ``;
						var dataComics = data.collectedIssues;
						var dataSeries = data.series.items;
						var dataStories = data.stories.items;
						var dataCreators = ``;

						if(cat == 'characters'){
							dataComics = data.comics.items;
							dataEvents = data.events.items;
							dataCharacters = undefined;
							dataCreators = undefined;
						} else if(cat == 'comics'){
							dataEvents = data.events.items;
							dataCharacters = data.characters.items;
							dataCreators = data.creators.items;
						} else if(cat == 'events'){
							dataEvents = undefined;
							dataCharacters = data.characters.items;
							dataComics = data.comics.items;
							dataCreators = data.creators.items;
						}

						if(dataCharacters !== undefined){
							setObj(dataCharacters, localStorageCharacters, `characters`, this);
						}
						if(dataEvents !== undefined){
							setObj(dataEvents, localStorageEvents, `events`, this);
						}
						if(dataComics !== undefined){
							setObj(dataComics, localStorageComics, `comics`, this);
						}
						if(dataSeries !== undefined){
							setObj(dataSeries, localStorageSeries, `series`, this);
						}
						if(dataStories !== undefined){
							setObj(dataStories, localStorageStories, `stories`, this);
						}
						if(dataCreators !== undefined){
							setObj(dataCreators, localStorageCreators, `creators`, this);
						}




/*
						// console.log(dataCharacters);
						dataCharacters = dataCharacters.map((val, i) => {
							//get ids
							var dataId = val.resourceURI;
							return dataId;
						});

						// console.log(dataCharacters);

						// matchCharacters is for setting the character state
						var matchCharacters = [];
						// leftOverCharacters is for setting the leftover characters not in local storage
						var leftOverCharacters = [];

						dataCharacters.map((val, i) => {
							var match = false;
							localStorageCharacters.data.map((arr, j) => {
								// console.log(typeof arr.id);
								if(arr.resourceURI === val){
									// console.log(`match`);
									// console.log(arr);
									matchCharacters.push(arr);
									match = true;
								}
							});
							// console.log(match);

							//push leftovers to w to get the rest of the characters
							if(match == false){
								leftOverCharacters.push(val);
							}
						});

						var localStorageCharactersArr = localStorageCharacters.data;

						// console.log(leftOverCharacters);
						if(leftOverCharacters.length !== 0){
							//get the rest of the characters
							leftOverCharacters.map((val, i) => {
								fetch(`${val}?apikey=${Api}`).then(res => res.json()).then((results) => {
									// console.log(results);
									var theData = results.data.results[0];
									matchCharacters.push(theData);
									// localStorageCharacters = JSON.parse(localStorageCharacters);
									// console.log(localStorageCharacters);
									// var q = localStorageCharacters.data;
									localStorageCharactersArr.push(theData);

									//remove duplicates
									// localStorageCharacters.data = Array.from(new Set(localStorageCharacters.data.map(a => a.id))).map(id => {
									// 	return localStorageCharacters.data.find(a => a.id === id)
									// });

									var arr = [matchCharacters, localStorageCharactersArr];

									return arr;

								}).then((arr) => {
									this.setState({
										characters: arr[0]
									});

									// console.log(arr[1]);
								 	// console.log(localStorageCharacters);

									var setLocalStorageCharacters = JSON.stringify(localStorageCharacters);
									localStorage.setItem("characters", setLocalStorageCharacters);
								});
							});

						} else {
							this.setState({
								characters: matchCharacters
							});
						}
*/
				/*} end of if statement*/

          // this.setState({
          //     data: theData.data,
          //     offset: theData.offset
          // });

      /*} end of case comics
        break;
		} end of switch */


		// on page load data
		/*
		fetch(dataURL).then(res => res.json()).then((results) => {
			// console.log(results);
			var data = results.data.results[0];
			console.log(data);

			this.setState({
				data: data
			});

			//get images
			var characters = ``;
			if(data.characters !== undefined){
				characters = data.characters.items;
				characters.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'characters');
				});
			}

			var comics = ``;
			if(data.comics !== undefined){
				comics = data.comics.items;
				comics.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'comics');
				});
			}

			var events = ``;
			if(data.events !== undefined){
				events = data.events.items;
				events.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'events');
				});
			}

			var series = ``;
			if(data.series !== undefined){
				series = data.series.items;
				if(series !== undefined){
					series.map(function(val, i){
						var id = val.resourceURI;
						id = id.split('/')[6];
						// console.log(id);
						$this.getInfo(id, 'series');
					});
				}
			}

			var stories = ``;
			if(data.stories !== undefined){
				stories = data.stories.items;
				stories.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'stories');
				});
			}

			var creators = ``;
			if(data.creators !== undefined){
				creators = data.creators.items;
				creators.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'creators');
				});
			}

		}, (error) => {
			console.log(error);
		});
		*/

	}


	handleClick(e) {

	}

	getInfo(infoId, infoCat){
		let id  = infoId
		let cat  = infoCat
		let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;
		let dataURL = `${baseURL}/${id}?apikey=${Api}&limit=10`;

		fetch(dataURL).then(res => res.json()).then((results) => {
			// console.log(`ajax from getInfo() pdpPage`);
			// console.log(results);
			var data = results.data.results[0];
			var arr = ``;

			if(infoCat == 'characters'){
				arr = this.state.characters;
				arr.push(data)
				this.setState({
					characters: arr,
				});
			} else if(infoCat == 'comics'){
				arr = this.state.comics;
				arr.push(data)
				this.setState({
					comics: arr,
				});
			} else if(infoCat == 'events'){
				arr = this.state.events;
				arr.push(data)
				this.setState({
					events: arr,
				});
			} else if(infoCat == 'series'){
				arr = this.state.series;
				arr.push(data)
				this.setState({
					series: arr,
				});
			} else if(infoCat == 'stories'){
				arr = this.state.stories;
				arr.push(data)
				this.setState({
					stories: arr,
				});
			} else if(infoCat == 'creators'){
				arr = this.state.creators;
				arr.push(data)
				this.setState({
					creators: arr,
				});
			}



		}, (error) => {
			console.log(error);
		});
	}


	changePdp(e){
		console.log(`pdp changePdp`);
		//console.log(e);
		console.log(e.target);
		let url = ``;
		if(e.target.tagName == "IMG"){
			url = e.target.parentNode.href;
		} else {
			url = e.target.href;
		}

		this.setState({
			data: {},
			characters: [],
			comics: [],
			events:[],
			series:[],
			stories:[],
			creators:[]
		});

		// let url = e.target.href;
		let urlArr = url.split('/');
		let cat = urlArr[urlArr.length - 2];
		let id = urlArr[urlArr.length -1];
		//console.log(url, urlArr, cat, id);

		let baseURL = `http://gateway.marvel.com/v1/public/${cat}`;

		// on page load data
		let dataURL = `${baseURL}/${id}?apikey=${Api}&limit=10`;
		fetch(dataURL).then(res => res.json()).then((results) => {
			//console.log(results);
			var data = results.data.results[0];
			var $this = this;

			this.setState({
				data: data
			});

			//get images
			var characters = ``;
			if(data.characters !== undefined){
				characters = data.characters.items;
				characters.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'characters');
				});
			}

			var comics = ``;
			if(data.comics !== undefined){
				comics = data.comics.items;
				comics.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'comics');
				});
			}

			var events = ``;
			if(data.events !== undefined){
				events = data.events.items;
				events.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'events');
				});
			}

			var series = ``;
			if(data.series !== undefined){
				series = data.series.items;
				if(series !== undefined){
					series.map(function(val, i){
						var id = val.resourceURI;
						id = id.split('/')[6];
						// console.log(id);
						$this.getInfo(id, 'series');
					});
				}
			}

			var stories = ``;
			if(data.stories !== undefined){
				stories = data.stories.items;
				stories.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'stories');
				});
			}

			var creators = ``;
			if(data.creators !== undefined){
				creators = data.creators.items;
				creators.map(function(val, i){
					var id = val.resourceURI;
					id = id.split('/')[6];
					// console.log(id);
					$this.getInfo(id, 'creators');
				});
			}

		}, (error) => {
			console.log(error);
		});

	}


	render() {

		console.log(this.state);

		let img =``;
		let data = ``;
		let title = ``;
		let desc = ``;
		let pageCount = ``;
		let issue =``;
		let urls =``;
		let characters = ``;
		let comics = ``;
		let events = ``;
		let stories = ``;
		let series = ``;
		let creators = ``;
		let li = ``;

		// console.log('characters length');
		// console.log(this.state.characters.length);
		if(this.state.characters.length !== 0 && this.state.characters.length > 5){
			// console.log(`characters is a go`);
			characters = <List url="characters" list={this.state.characters} slider="true" changePdp={this.changePdp} />
			document.getElementsByClassName('characters')[0].style.display = "block";
		} else if(this.state.characters.length !== 0 && this.state.characters.length < 5) {
			// console.log(`characters is a go`);
			characters = <List url="characters" list={this.state.characters} slider="false" changePdp={this.changePdp} />
			document.getElementsByClassName('characters')[0].style.display = "block";
		}

		// console.log('comics length');
		// console.log(this.state.comics.length);
		if(this.state.comics.length !== 0 && this.state.comics.length > 5){
			// console.log(`comics is a go`);
			comics = <List url="comics" list={this.state.comics} slider="true" changePdp={this.changePdp} />
			document.getElementsByClassName('comics')[0].style.display = "block";
		} else if(this.state.comics.length !== 0 && this.state.comics.length < 5){
			// console.log(`comics is a go`);
			comics = <List url="comics" list={this.state.comics} slider="false" changePdp={this.changePdp} />
			document.getElementsByClassName('comics')[0].style.display = "block";
		}

		// console.log('events length');
		// console.log(this.state.events.length);
		if(this.state.events.length !== 0 && this.state.events.length > 5){
			// console.log(`events is a go`);
			events = <List url="events" list={this.state.events} slider="true" changePdp={this.changePdp} />
			document.getElementsByClassName('events')[0].style.display = "block";
		} else if(this.state.events.length !== 0 && this.state.events.length < 5){
			// console.log(`events is a go`);
			events = <List url="events" list={this.state.events} slider="false" changePdp={this.changePdp} />
			document.getElementsByClassName('events')[0].style.display = "block";
		}

		// console.log('series length');
		// console.log(this.state.series.length);
		if(this.state.series.length !== 0 && this.state.series.length > 5){
			// console.log(`series is a go`);
			series = <List url="series" list={this.state.series} slider="true" changePdp={this.changePdp} />
			document.getElementsByClassName('series')[0].style.display = "block";
		} else if(this.state.series.length !== 0 && this.state.series.length < 5){
			// console.log(`series is a go`);
			series = <List url="series" list={this.state.series} slider="false" changePdp={this.changePdp} />
			document.getElementsByClassName('series')[0].style.display = "block";
		}

		// console.log('creators length');
		// console.log(this.state.creators.length);
		if(this.state.creators.length !== 0){
			// console.log(`creators is a go`);
			creators = <List url="creators" list={this.state.creators} slider="false" changePdp={this.changePdp} />
			document.getElementsByClassName('creators')[0].style.display = "block";
		}

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
				desc = <p dangerouslySetInnerHTML={{ __html: desc }} />
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

			document.getElementsByClassName('loading')[0].style.display = 'none';

			var pdpPage = document.getElementsByClassName('pdp');
			pdpPage[0].style.display = 'block';

		} // end of if


		return (
			<React.Fragment>
				<div className="pdp">

					<div className="first">
						<h1 className="mobile">{title}</h1>
						{img}
						<div>
							<h1 className="desktop">{title}</h1>
							{desc}
							{issue}
							{pageCount}
							{urls}
							<div className="creators">
								<h2>Creators</h2>
								{creators}
							</div>
						</div>
					</div>

					<div className="second">

						<div className ="characters">
							<h2>characters</h2>
							{characters}
						</div>

						<div className="comics">
							<h2>comics</h2>
							{comics}
						</div>

						<div className ="events">
							<h2>events</h2>
							{events}
						</div>

						<div className="series">
							<h2>series</h2>
							{series}
						</div>

					</div>

				</div>
			</React.Fragment>
		);



  } //end of render
}

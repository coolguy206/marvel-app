import React from 'react';
import { Api } from './Api';
import { List } from './List';
import Image from './Image';
import { List2 } from './List2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Database from './Database';
import EditData from './EditData';
import PutData from './PutData';

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
			creators:[],
			category: this.props.match.params.Category,
			id: this.props.match.params.Id,
		};
		this.changePdp = this.changePdp.bind(this);
		this.findData = this.findData.bind(this);
		this.setData = this.setData.bind(this);
	}

	findData(id, arr){
		var data = ``;
		arr.map((val,i) => {
			if(id == val.id){
				// console.log(val);
				data = val;
			}
		});
		return data;
	}

	setData(theId, theCat, theDb){
		let id  = theId;
		let cat  = theCat;
		let db = theDb;

		switch(cat){
	    case 'comics':
	      db.comics.allDocs({include_docs: true}).then((docs) => {
	        // console.log(docs);
	        return docs;
	      }).then((docs) => {
					//set data state
	        var arr = EditData(docs.rows);
					var data = this.findData(id, arr);
					// console.log(data);
	        this.setState({
	          data: data
	        });
					return data;
	      }).then((data) => {
					// console.log(`the data`);
					// put databases
					if(data.collectedIssues !== undefined){
						var comics = data.collectedIssues;
						PutData(this, comics, 'comics', db.comics, true, function($this, item) {
							console.log(item);
							$this.state.comics.push(item);
							console.log(`comics state`);
							console.log($this.state.comics);
							var list = $this.state.comics;
							$this.setState({
								comics: list
							});
						});
					}

					if(data.characters !== undefined){
						var characters = data.characters.items;
						PutData(this, characters, 'characters', db.characters, true, function($this, item) {
							// console.log(item);
							$this.state.characters.push(item);
							console.log(`characters state from this`);
							console.log($this.state.characters);
							var list = $this.state.characters;
							$this.setState({
								characters: list
							});
						});
					}

					if(data.creators !== undefined){
						var creators = data.creators.items;
						PutData(this, creators, 'creators', db.creators, true, function($this, item) {
							// console.log(item);
							$this.state.creators.push(item);
							console.log(`creators state`);
							console.log($this.state.creators);
							var list = $this.state.creators;
							$this.setState({
								creators: list
							});
						});
					}

					if(data.events !== undefined){
						var events = data.events.items;
						PutData(this, events, 'events', db.events, true, function($this, item) {
							// console.log(item);
							$this.state.events.push(item);
							console.log(`events state`);
							console.log($this.state.events);
							var list = $this.state.events;
							$this.setState({
								events: list
							});
						});
					}

					//what if not array????
					// var series = data.series.items;
					// PutData(this, series, 'series', db.series, true, function($this, item) {
					// 	// console.log(item);
					// 	$this.state.series.push(item);
					// 	console.log(`series state`);
					// 	console.log($this.state.series);
					// 	var list = $this.state.series;
					// 	$this.setState({
					// 		series: list
					// 	});
					// });

					if(data.stories !== undefined){
						var stories = data.stories.items;
						PutData(this, stories, 'stories', db.stories, true, function($this, item) {
							// console.log(item);
							$this.state.stories.push(item);
							console.log(`stories state`);
							console.log($this.state.stories);
							var list = $this.state.stories;
							$this.setState({
								stories: list
							});
						});
					}
				});
	      break;

	    case 'characters':
				db.characters.allDocs({include_docs: true}).then((docs) => {
					// console.log(docs);
					return docs;
				}).then((docs) => {
					//set data state
					var arr = EditData(docs.rows);
					var data = this.findData(id, arr);
					// console.log(data);
					this.setState({
						data: data
					});
					return data;
				}).then((data) => {
					console.log(data);
					//put databases
					if(data.comics !== undefined){
						var comics = data.comics.items;
						PutData(this, comics, 'comics', db.comics, true, function($this, item) {
							console.log(item);
							$this.state.comics.push(item);
							console.log(`comics state`);
							console.log($this.state.comics);
							var list = $this.state.comics;
							$this.setState({
								comics: list
							});
						});
					}

					// var characters = data.characters.items;
					// PutData(this, characters, 'characters', db.characters, true, function($this, item) {
					// 	// console.log(item);
					// 	$this.state.characters.push(item);
					// 	console.log(`characters state`);
					// 	console.log($this.state.characters);
					// 	var list = $this.state.characters;
					// 	$this.setState({
					// 		characters: list
					// 	});
					// });

					// var creators = data.creators.items;
					// PutData(this, creators, 'creators', db.creators, true, function($this, item) {
					// 	// console.log(item);
					// 	$this.state.creators.push(item);
					// 	console.log(`creators state`);
					// 	console.log($this.state.creators);
					// 	var list = $this.state.creators;
					// 	$this.setState({
					// 		creators: list
					// 	});
					// });

					if(data.events !== undefined){
						var events = data.events.items;
						PutData(this, events, 'events', db.events, true, function($this, item) {
							// console.log(item);
							$this.state.events.push(item);
							console.log(`events state`);
							console.log($this.state.events);
							var list = $this.state.events;
							$this.setState({
								events: list
							});
						});
					}

					if(data.series !== undefined){
						var series = data.series.items;
						PutData(this, series, 'series', db.series, true, function($this, item) {
							// console.log(item);
							$this.state.series.push(item);
							console.log(`series state`);
							console.log($this.state.series);
							var list = $this.state.series;
							$this.setState({
								series: list
							});
						});
					}

					if(data.stories !== undefined){
						var stories = data.stories.items;
						PutData(this, stories, 'stories', db.stories, true, function($this, item) {
							// console.log(item);
							$this.state.stories.push(item);
							console.log(`stories state`);
							console.log($this.state.stories);
							var list = $this.state.stories;
							$this.setState({
								stories: list
							});
						})
					}
				});
	      break;

	    case 'events':
				db.events.allDocs({include_docs: true}).then((docs) => {
					// console.log(docs);
					return docs;
				}).then((docs) => {
					//set data state
					var arr = EditData(docs.rows);
					var data = this.findData(id, arr);
					// console.log(data);
					this.setState({
						data: data
					});
					return data;
				}).then((data) => {
					console.log(data);
					//put databases
					if(data.comics !== undefined){
						var comics = data.comics.items;
						PutData(this, comics, 'comics', db.comics, true, function($this, item) {
							console.log(item);
							$this.state.comics.push(item);
							console.log(`comics state`);
							console.log($this.state.comics);
							var list = $this.state.comics;
							$this.setState({
								comics: list
							});
						});
					}

					if(data.characters !== undefined){
						var characters = data.characters.items;
						PutData(this, characters, 'characters', db.characters, true, function($this, item) {
							// console.log(item);
							$this.state.characters.push(item);
							console.log(`characters state`);
							console.log($this.state.characters);
							var list = $this.state.characters;
							$this.setState({
								characters: list
							});
						});
					}

					if(data.creators !== undefined){
						var creators = data.creators.items;
						PutData(this, creators, 'creators', db.creators, true, function($this, item) {
							// console.log(item);
							$this.state.creators.push(item);
							console.log(`creators state`);
							console.log($this.state.creators);
							var list = $this.state.creators;
							$this.setState({
								creators: list
							});
						});
					}

					// var events = data.events.items;
					// PutData(this, events, 'events', db.events, true, function($this, item) {
					// 	// console.log(item);
					// 	$this.state.events.push(item);
					// 	console.log(`events state`);
					// 	console.log($this.state.events);
					// 	var list = $this.state.events;
					// 	$this.setState({
					// 		events: list
					// 	});
					// });

					if(data.series !== undefined){
						var series = data.series.items;
						PutData(this, series, 'series', db.series, true, function($this, item) {
							// console.log(item);
							$this.state.series.push(item);
							console.log(`series state`);
							console.log($this.state.series);
							var list = $this.state.series;
							$this.setState({
								series: list
							});
						});
					}

					if(data.stories !== undefined){
						var stories = data.stories.items;
						PutData(this, stories, 'stories', db.stories, true, function($this, item) {
							// console.log(item);
							$this.state.stories.push(item);
							console.log(`stories state`);
							console.log($this.state.stories);
							var list = $this.state.stories;
							$this.setState({
								stories: list
							});
						})
					}
				});
	      break;

	    case 'series':
				db.series.allDocs({include_docs: true}).then((docs) => {
					// console.log(docs);
					return docs;
				}).then((docs) => {
					//set data state
					var arr = EditData(docs.rows);
					var data = this.findData(id, arr);
					// console.log(data);
					this.setState({
						data: data
					});
					return data;
				}).then((data) => {
					console.log(data);
					//put databases
					if(data.comics !== undefined){
						var comics = data.comics.items;
						PutData(this, comics, 'comics', db.comics, true, function($this, item) {
							console.log(item);
							$this.state.comics.push(item);
							console.log(`comics state`);
							console.log($this.state.comics);
							var list = $this.state.comics;
							$this.setState({
								comics: list
							});
						});
					}

					if(data.characters !== undefined){
						var characters = data.characters.items;
						PutData(this, characters, 'characters', db.characters, true, function($this, item) {
							// console.log(item);
							$this.state.characters.push(item);
							console.log(`characters state`);
							console.log($this.state.characters);
							var list = $this.state.characters;
							$this.setState({
								characters: list
							});
						});
					}

					if(data.creators !== undefined){
						var creators = data.creators.items;
						PutData(this, creators, 'creators', db.creators, true, function($this, item) {
							// console.log(item);
							$this.state.creators.push(item);
							console.log(`creators state`);
							console.log($this.state.creators);
							var list = $this.state.creators;
							$this.setState({
								creators: list
							});
						});
					}

					if(data.events !== undefined){
						var events = data.events.items;
						PutData(this, events, 'events', db.events, true, function($this, item) {
							// console.log(item);
							$this.state.events.push(item);
							console.log(`events state`);
							console.log($this.state.events);
							var list = $this.state.events;
							$this.setState({
								events: list
							});
						});
					}

					//what if not array????
					// var series = data.series.items;
					// PutData(this, series, 'series', db.series, true, function($this, item) {
					// 	// console.log(item);
					// 	$this.state.series.push(item);
					// 	console.log(`series state`);
					// 	console.log($this.state.series);
					// 	var list = $this.state.series;
					// 	$this.setState({
					// 		series: list
					// 	});
					// });

					if(data.stories !== undefined){
						var stories = data.stories.items;
						PutData(this, stories, 'stories', db.stories, true, function($this, item) {
							// console.log(item);
							$this.state.stories.push(item);
							console.log(`stories state`);
							console.log($this.state.stories);
							var list = $this.state.stories;
							$this.setState({
								stories: list
							});
						})
					}
				});
	      break;

	    case 'stories':
				db.stories.allDocs({include_docs: true}).then((docs) => {
					// console.log(docs);
					return docs;
				}).then((docs) => {
					//set data state
					var arr = EditData(docs.rows);
					var data = this.findData(id, arr);
					// console.log(data);
					this.setState({
						data: data
					});
					return data;
				}).then((data) => {
					console.log(data);
					//put databases
					if(data.comics !== undefined){
						var comics = data.comics.items;
						PutData(this, comics, 'comics', db.comics, true, function($this, item) {
							console.log(item);
							$this.state.comics.push(item);
							console.log(`comics state`);
							console.log($this.state.comics);
							var list = $this.state.comics;
							$this.setState({
								comics: list
							});
						});
					}

					if(data.characters !== undefined){
						var characters = data.characters.items;
						PutData(this, characters, 'characters', db.characters, true, function($this, item) {
							// console.log(item);
							$this.state.characters.push(item);
							console.log(`characters state`);
							console.log($this.state.characters);
							var list = $this.state.characters;
							$this.setState({
								characters: list
							});
						});
					}

					if(data.creators !== undefined){
						var creators = data.creators.items;
						PutData(this, creators, 'creators', db.creators, true, function($this, item) {
							// console.log(item);
							$this.state.creators.push(item);
							console.log(`creators state`);
							console.log($this.state.creators);
							var list = $this.state.creators;
							$this.setState({
								creators: list
							});
						});
					}

					if(data.events !== undefined){
						var events = data.events.items;
						PutData(this, events, 'events', db.events, true, function($this, item) {
							// console.log(item);
							$this.state.events.push(item);
							console.log(`events state`);
							console.log($this.state.events);
							var list = $this.state.events;
							$this.setState({
								events: list
							});
						});
					}

					if(data.series !== undefined){
						var series = data.series.items;
						PutData(this, series, 'series', db.series, true, function($this, item) {
							// console.log(item);
							$this.state.series.push(item);
							console.log(`series state`);
							console.log($this.state.series);
							var list = $this.state.series;
							$this.setState({
								series: list
							});
						});
					}

					// var stories = data.stories.items;
					// PutData(this, stories, 'stories', db.stories, true, function($this, item) {
					// 	// console.log(item);
					// 	$this.state.stories.push(item);
					// 	console.log(`stories state`);
					// 	console.log($this.state.stories);
					// 	var list = $this.state.stories;
					// 	$this.setState({
					// 		stories: list
					// 	});
					// })

				});
	      break;

	    case 'creators':
				db.creators.allDocs({include_docs: true}).then((docs) => {
					// console.log(docs);
					return docs;
				}).then((docs) => {
					//set data state
					var arr = EditData(docs.rows);
					var data = this.findData(id, arr);
					// console.log(data);
					this.setState({
						data: data
					});
					return data;
				}).then((data) => {
					console.log(data);
					//put databases
					if(data.comics !== undefined){
						var comics = data.comics.items;
						PutData(this, comics, 'comics', db.comics, true, function($this, item) {
							console.log(item);
							$this.state.comics.push(item);
							console.log(`comics state`);
							console.log($this.state.comics);
							var list = $this.state.comics;
							$this.setState({
								comics: list
							});
						});
					}

					// var characters = data.characters.items;
					// PutData(this, characters, 'characters', db.characters, true, function($this, item) {
					// 	// console.log(item);
					// 	$this.state.characters.push(item);
					// 	console.log(`characters state`);
					// 	console.log($this.state.characters);
					// 	var list = $this.state.characters;
					// 	$this.setState({
					// 		characters: list
					// 	});
					// });

					// var creators = data.creators.items;
					// PutData(this, creators, 'creators', db.creators, true, function($this, item) {
					// 	// console.log(item);
					// 	$this.state.creators.push(item);
					// 	console.log(`creators state`);
					// 	console.log($this.state.creators);
					// 	var list = $this.state.creators;
					// 	$this.setState({
					// 		creators: list
					// 	});
					// });

					if(data.events !== undefined){
						var events = data.events.items;
						PutData(this, events, 'events', db.events, true, function($this, item) {
							// console.log(item);
							$this.state.events.push(item);
							console.log(`events state`);
							console.log($this.state.events);
							var list = $this.state.events;
							$this.setState({
								events: list
							});
						});
					}

					if(data.series !== undefined){
						var series = data.series.items;
						PutData(this, series, 'series', db.series, true, function($this, item) {
							// console.log(item);
							$this.state.series.push(item);
							console.log(`series state`);
							console.log($this.state.series);
							var list = $this.state.series;
							$this.setState({
								series: list
							});
						});
					}

					if(data.stories !== undefined){
						var stories = data.stories.items;
						PutData(this, stories, 'stories', db.stories, true, function($this, item) {
							// console.log(item);
							$this.state.stories.push(item);
							console.log(`stories state`);
							console.log($this.state.stories);
							var list = $this.state.stories;
							$this.setState({
								stories: list
							});
						})
					}
				});
	      break;

	  }
	}

	componentDidMount() {
		var db = Database;
    // console.log(db);

    // db.comics.info().then(function (info) {
    //   console.log(info);
    // })

		let id  = this.props.match.params.Id;
		let cat  = this.props.match.params.Category;
		this.setData(id, cat, db);
	}

	changePdp(e){
		// console.log(`pdp changePdp`);

		//hide the characters, comics, creators, events, series
		document.getElementsByClassName('characters')[0].style.display = "none";
		document.getElementsByClassName('comics')[0].style.display = "none";
		document.getElementsByClassName('events')[0].style.display = "none";
		document.getElementsByClassName('series')[0].style.display = "none";
		document.getElementsByClassName('creators')[0].style.display = "none";

		//console.log(e);
		// console.log(e.target);
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
		var db = Database;
		let urlArr = url.split('/');
		let cat = urlArr[urlArr.length - 2];
		let id = urlArr[urlArr.length -1];
		// console.log(url, urlArr, cat, id);
		this.setData(id, cat, db);

	}

	render() {
		// console.log(`pdp state`);
		// console.log(this.state);
		let img =``;
		let data = ``;
		let title = ``;
		let desc = ``;
		let pageCount = ``;
		let issue =``;
		let urls =``;
		let dates = ``;
		let images = ``;
		let characters = ``;
		let comics = ``;
		let events = ``;
		let stories = ``;
		let series = ``;
		let creators = ``;
		let li = ``;

		if(this.state.category !== this.props.match.params.Category){
      // console.log(`category don't match`);
      window.location.reload();
    } else if(this.state.id !== this.props.match.params.Id){
      // console.log(`id don't match`);
      window.location.reload();
    }

		// console.log('characters length');
		// console.log(this.state.characters);
		// console.log(this.state.characters.length);
		if(this.state.characters.length !== 0 && this.state.characters.length > 5){
			// console.log(`characters is a go`);
			characters = <List url="characters" list={this.state.characters} slider="true" changePdp={this.changePdp} />
			document.getElementsByClassName('characters')[0].style.display = "block";
		} else if(this.state.characters.length !== 0 && this.state.characters.length <= 5) {
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
		} else if(this.state.comics.length !== 0 && this.state.comics.length <= 5){
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
		} else if(this.state.events.length !== 0 && this.state.events.length <= 5){
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
		} else if(this.state.series.length !== 0 && this.state.series.length <= 5){
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
			if(cat == `creators`){
				title = data.fullName;
			} else if(title == undefined) {
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

			if(data.dates !== undefined && data.dates.length !== 0 ){
				dates = data.dates.map((val, i)=>{
					var theDate = new Date(val.date).toDateString();

					if(theDate !== `Invalid Date`){
						theDate = theDate.split(' ');
						theDate = `${theDate[1]} ${theDate[2]}, ${theDate[3]}`;

						var str = ``;
						if(val.type == `onsaleDate`){
							str = `On Sale Date`;
						} else if(val.type == `focDate`){
							str = `Final Order Cutoff Date`;
						} else if(val.type == `unlimitedDate`){
							str = `Unlimited Date`;
						} else if(val.type == `digitalPurchaseDate`){
							str = `Digital Purchase Date`;
						}

						return(<p key={i}>{str}: {theDate}</p>)
					}
				});
			}

			if(data.images !== undefined){
				if(data.images.length > 1){
					images = data.images.map((val, i)=>{
						return(<Image key={i} name={data.title} href={val.path} ext={val.extension} size='portrait'  />)
					});
				} else {
					images = <Image name={data.title} href={data.images[0].path} ext={data.images[0].extension} size='portrait'  />
				}
			}

			if(cat!== `comics`){
				img = <Image name={data.title} className="padding" href={data.thumbnail.path} ext={data.thumbnail.extension} size='portrait'  />
			}

			if(data.urls.length == 1){
				urls = <a href={data.urls[0].url} className="cta single" target="_blank">learn more</a>
			} else {
				li = data.urls.map(function(val, i){
					return(
						<li key={i}><a href={val.url} className="cta" target="_blank">{val.type}</a></li>
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
						<div>
							<div className="the-title">
								<h1 className="desktop">{title}</h1>
								{desc}
							</div>
							<div className="the-images">
								{img}
								{images}
							</div>
							<div className="the-details">
								{issue}
								{pageCount}
								{dates}
								{urls}
							</div>
						</div>

						<div className="creators">
							<h2>Creators</h2>
							{creators}
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

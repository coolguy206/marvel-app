import React from 'react';
import { Api } from './Api';
import Image from './Image';
// import { List } from './List';
import {Loading} from './Loading';
import Database from './Database';
import EditData from './EditData';
import PouchDB from 'pouchdb';
import {FilterIcon} from './FilterIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      cat: this.props.match.params.Category
    };
    this.getMore = this.getMore.bind(this);
  }

  componentDidMount() {
    var offset = Math.floor(Math.random() * 900);
    let cat  = this.props.match.params.Category;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}?apikey=${Api}`;

    var dbOffsets = new PouchDB('marvel-offsets');
    dbOffsets.bulkDocs([
      {_id: 'comics', offset: 20},
      {_id: 'characters', offset: 20},
      {_id: 'events', offset: 20},
      {_id: 'series', offset: 20},
    ]);
    // dbOffsets.allDocs({include_docs: true}).then((docs) => {
    //   console.log(`offset database`);
    //   console.log(docs);
    // });

    var db = Database;
    switch(cat){
      case 'comics':
        // set data
        db.comics.allDocs({include_docs: true}).then((docs) => {
          console.log(`comics all docs`);
          console.log(docs);
          return docs;
        }).then((docs) => {
          var data = EditData(docs.rows);
          this.setState({
            data: data
          });
        });
        //set offset
        dbOffsets.get('comics').then((doc) => {
          // handle doc
          console.log(doc);
          this.setState({
            offset: doc.offset
          });
        });
        break;
      case 'characters':
        //set data
        db.characters.allDocs({include_docs: true}).then((docs) => {
          console.log(`characters all docs`);
          console.log(docs);
          return docs;
        }).then((docs) => {
          var data = EditData(docs.rows);
          this.setState({
            data: data
          });
        });
        //set offset
        dbOffsets.get('characters').then((doc) => {
          // handle doc
          console.log(doc);
          return doc;
        }).then((doc) => {
          this.setState({
            offset: doc.offset
          });
        });
        break;
      case 'events':
        //set data
        db.events.allDocs({include_docs: true}).then((docs) => {
          console.log(`events all docs`);
          console.log(docs);
          return docs;
        }).then((docs) => {
          var data = EditData(docs.rows);
          this.setState({
            data: data
          });
        });
        //set offset
        dbOffsets.get('events').then((doc) => {
          // handle doc
          console.log(doc);
          return doc;
        }).then((doc) => {
          this.setState({
            offset: doc.offset
          });
        });
        break;
      case 'series':
        //set data
        db.series.allDocs({include_docs: true}).then((docs) => {
          console.log(`series all docs`);
          console.log(docs);
          return docs;
        }).then((docs) => {
          var data = EditData(docs.rows);
          this.setState({
            data: data
          });
        });
        //set offset
        dbOffsets.get('series').then((doc) => {
          // handle doc
          console.log(doc);
          return doc;
        }).then((doc) => {
          this.setState({
            offset: doc.offset
          });
        });
        break;
      case 'stories':
        db.stories.allDocs({include_docs: true}).then((docs) => {
          console.log(`stories all docs`);
          console.log(docs);
          return docs;
        }).then((docs) => {
          var data = EditData(docs.rows);
          this.setState({
            data: data
          });
        });
        break;
      case 'creators':
        db.creators.allDocs({include_docs: true}).then((docs) => {
          console.log(`creators all docs`);
          console.log(docs);
          return docs;
        }).then((docs) => {
          var data = EditData(docs.rows);
          this.setState({
            data: data
          });
        });
        break;
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
  getMore(e){

    console.log(`getMore function`);
    //console.log(e.target);
    var theButton = e.target;
    theButton.style.display = 'none';
    var theLoading = e.target.nextSibling;
    theLoading.style.display = 'block';
    var offset = this.state.offset;
    let cat  = this.props.match.params.Category;
    let baseURL = `http://gateway.marvel.com/v1/public/${cat}?apikey=${Api}&offset=${offset}`;
    var dbOffsets = new PouchDB('marvel-offsets');

    fetch(baseURL).then(res => res.json()).then((results) => {
      // console.log('ajax from button click landing page');
      console.log(results);
      return results;
    }).then((results) => {
      var db = Database;
      var updatedArray = [];
      var theArray = results.data.results;
      theArray.map((obj, i) => {
        var doc = {};
        doc["_id"] = `${cat}-${obj.id}`;
        var returnedTarget = Object.assign(obj, doc)
        // console.log(returnedTarget);
        updatedArray.push(returnedTarget);
      });
      // console.log(updatedArray);
      // console.log(results.data.limit);
      // console.log(this.state.offset);
      var theOffset =  results.data.limit + this.state.offset;
      // console.log(theOffset);

      switch(cat){
        case 'comics':
          // set data
          db.comics.bulkDocs(updatedArray).then((docs) => {
            console.log(`comics buldDocs`);
            console.log(docs);
            // return updatedArray;
          }).then(() => {
            db.comics.allDocs({include_docs: true}).then((results) => {
              console.log(`geta all comics database`);
              console.log(results);
              return results;
            }).then((results) => {
              var data = [];
              results.rows.map((val, i) => {
                data.push(val.doc);
              });
              this.setState({
                data: data
              });
            });
          });

          //set offset
          dbOffsets.get('comics').then((doc) => {
            console.log(`comics offset database`);
            console.log(doc);
            dbOffsets.put({
              _id: 'comics',
              _rev: doc._rev,
              offset: theOffset
            });
            return theOffset;
          }).then((theOffset) => {
            this.setState({
              offset: theOffset
            });
          });
            break;
        case 'characters':
          // set data
          db.characters.bulkDocs(updatedArray).then((docs) => {
            console.log(`characters buldDocs`);
            console.log(docs);
            // return updatedArray;
          }).then(() => {
            db.characters.allDocs({include_docs: true}).then((results) => {
              console.log(`geta all characters database`);
              console.log(results);
              return results;
            }).then((results) => {
              var data = [];
              results.rows.map((val, i) => {
                data.push(val.doc);
              });
              this.setState({
                data: data
              });
            });
          });

          //set offset
          dbOffsets.get('characters').then((doc) => {
            console.log(`characters offset database`);
            console.log(doc);
            dbOffsets.put({
              _id: 'characters',
              _rev: doc._rev,
              offset: theOffset
            });
            return theOffset;
          }).then((theOffset) => {
            this.setState({
              offset: theOffset
            });
          });
            break;
        case 'events':
          // set data
          db.events.bulkDocs(updatedArray).then((docs) => {
            console.log(`events buldDocs`);
            console.log(docs);
            // return updatedArray;
          }).then(() => {
            db.events.allDocs({include_docs: true}).then((results) => {
              console.log(`geta all events database`);
              console.log(results);
              return results;
            }).then((results) => {
              var data = [];
              results.rows.map((val, i) => {
                data.push(val.doc);
              });
              this.setState({
                data: data
              });
            });
          });

          //set offset
          dbOffsets.get('events').then((doc) => {
            console.log(`events offset database`);
            console.log(doc);
            dbOffsets.put({
              _id: 'events',
              _rev: doc._rev,
              offset: theOffset
            });
            return theOffset;
          }).then((theOffset) => {
            this.setState({
              offset: theOffset
            });
          });
            break;
        case 'series':
          // set data
          db.series.bulkDocs(updatedArray).then((docs) => {
            console.log(`series buldDocs`);
            console.log(docs);
            // return updatedArray;
          }).then(() => {
            db.series.allDocs({include_docs: true}).then((results) => {
              console.log(`geta all series database`);
              console.log(results);
              return results;
            }).then((results) => {
              var data = [];
              results.rows.map((val, i) => {
                data.push(val.doc);
              });
              this.setState({
                data: data
              });
            });
          });

          //set offset
          dbOffsets.get('series').then((doc) => {
            console.log(`series offset database`);
            console.log(doc);
            dbOffsets.put({
              _id: 'series',
              _rev: doc._rev,
              offset: theOffset
            });
            return theOffset;
          }).then((theOffset) => {
            this.setState({
              offset: theOffset
            });
          });
            break;
        case 'stories':
          // set data
          db.stories.bulkDocs(updatedArray).then((docs) => {
            console.log(`stories buldDocs`);
            console.log(docs);
            // return updatedArray;
          }).then(() => {
            db.stories.allDocs({include_docs: true}).then((results) => {
              console.log(`geta all stories database`);
              console.log(results);
              return results;
            }).then((results) => {
              var data = [];
              results.rows.map((val, i) => {
                data.push(val.doc);
              });
              this.setState({
                data: data
              });
            });
          });

          //set offset
          dbOffsets.get('stories').then((doc) => {
            console.log(`stories offset database`);
            console.log(doc);
            dbOffsets.put({
              _id: 'stories',
              _rev: doc._rev,
              offset: theOffset
            });
            return theOffset;
          }).then((theOffset) => {
            this.setState({
              offset: theOffset
            });
          });
            break;
        case 'creators':
          // set data
          db.creators.bulkDocs(updatedArray).then((docs) => {
            console.log(`creators buldDocs`);
            console.log(docs);
            // return updatedArray;
          }).then(() => {
            db.creators.allDocs({include_docs: true}).then((results) => {
              console.log(`geta all creators database`);
              console.log(results);
              return results;
            }).then((results) => {
              var data = [];
              results.rows.map((val, i) => {
                data.push(val.doc);
              });
              this.setState({
                data: data
              });
            });
          });

          //set offset
          dbOffsets.get('creators').then((doc) => {
            console.log(`creators offset database`);
            console.log(doc);
            dbOffsets.put({
              _id: 'creators',
              _rev: doc._rev,
              offset: theOffset
            });
            return theOffset;
          }).then((theOffset) => {
            this.setState({
              offset: theOffset
            });
          });
            break;
      }
      theButton.style.display = 'block';
      theLoading.style.display = 'none';
    });
  }

  render() {
    // console.log(`landing page state`);
    // console.log(this.state);
    // console.log(this.props.match.params.Category);

    if(this.state.cat !== this.props.match.params.Category){
      // console.log(`cats don't match`);
      window.location.reload();
    }

    let li =``;
    let cat  = this.props.match.params.Category;
    if(this.state.data !== undefined){
      // data =  <List url={cat} list={this.state.data} />
      var listItems = this.state.data;
      li = listItems.map(function(val, i){
        let id = val.id;
        let href = `/apps/marvel-comics/#/${cat}/${id}`;
        var name = ``;
        if(cat == 'creators'){
          name = val.fullName;
        } else {
          name = val.name;
          //console.log(name);
          if(name === undefined){
            name = val.title;
          }
        }

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

    //document.getElementsByClassName('landing-page')[0].style.display = 'block';
    var landing =  document.getElementsByClassName('landing-page')[0];
    if(landing !== undefined){
      landing.style.display = 'block';
    }
    var loading = document.getElementsByClassName('loading')[0];
    if(loading !== undefined){
      loading.style.display = 'none';
    }
    // <FontAwesomeIcon icon={faCheckSquare} size="2x"/>
    // <FontAwesomeIcon icon={faSquare} size="2x"/>
    // <FontAwesomeIcon icon={faTimesCircle} size="2x"/>

    return (
      <React.Fragment>
        <div className="landing-page">
          <h1>{cat}</h1>
          <FilterIcon data={this.state.data} cat={this.state.cat} $this={this}/>
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

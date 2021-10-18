import { Api } from './Api';

var PutData = ($this, arr, str, database, isArr, func) => {
  console.log(`PutData.js`);
  var goFetch = false;
  // console.log(arr, str, database, isArr);
  // return new Promise((resolve, reject) => {
  database.allDocs({include_docs: true}).then((docs) => {
    // console.log(docs);
    return docs.rows;
  }).then((docs) => {
    var returnedArr = [];
    if(isArr == false) {
      console.log(`it is not an array`);
      var id = arr.resourceURI;
      id = id.split('/');
      id = id[id.length -1];
      let theUrl = `http://gateway.marvel.com/v1/public/${str}/${id}?apikey=${Api}`;
      fetch(theUrl).then(res => res.json()).then((results) => {
        // console.log(results);
        var data = results.data.results[0];
        var doc = {};
        doc["_id"] = `${str}-${data.id}`;
        var returnedTarget = Object.assign(data, doc)
        // console.log(returnedTarget);
        returnedArr.push(returnedTarget);
        return returnedTarget;
      }).then((returnedTarget) => {
        // put the array to the database
        database.put(returnedTarget).then((item) => {
          console.log(`${str} db put`);
          console.log(item);
        });
      });
    } else {
      arr.map((val,i) => {
        var id = val.resourceURI;
        id = id.split('/');
        id = id[id.length -1];
        id = Number(id);
        // console.log(id);

        var data = ``;
    		for(var j =0; j < docs.length; j++){
          // console.log(id, docs[j].doc.id);
          if(id == docs[j].doc.id){
    				// console.log(`match don't fetch`);
            // console.log(id, docs[j].doc.id);
            goFetch = false;
    				func($this, docs[j].doc);
            break;
    			} else {
            // console.log(`no match yet`);
            goFetch = true;
            // console.log(id, docs[j].doc.id);
          }
        }

        // console.log(goFetch);
        if(goFetch == true){
          let theUrl = `http://gateway.marvel.com/v1/public/${str}/${id}?apikey=${Api}`;
          // console.log(theUrl);
          fetch(theUrl).then(res => res.json()).then((results) => {
            if(results.data !== undefined){
              // console.log(results);
              var data = results.data.results[0];
              var doc = {};
              doc["_id"] = `${str}-${data.id}`;
              var returnedTarget = Object.assign(data, doc)
              // console.log(`returnedTarget`);
              // console.log(returnedTarget);
              returnedArr.push(returnedTarget);
              return returnedTarget;
            }
          }).then((returnedTarget) => {
            // put the array to the database
            database.put(returnedTarget).then((item) => {
              // console.log(`${str} db put`);
              // console.log(item);
              return item;
            }).then((item) => {
              database.get(item.id).then((item) => {
                // console.log(`${str} db get`);
                // console.log(item);
                func($this, item)
              });
            }).catch((err) =>{
              console.log(`error`);
              console.log(err);
              database.get(err.id).then((item) => {
                console.log(`${str} error db get`);
                console.log(item);
                func($this, item)
              });
            });
          });
        }
      });
    
    }
    // console.log(`returnedArr`);
    // console.log(returnedArr);
    // resolve(returnedArr);
  });
};

export default PutData;

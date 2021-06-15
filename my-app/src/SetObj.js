import { Api } from './Api';

const setObj = (data, storage, str, $this) => {

  // console.log(data);
  data = data.map((val, i) => {
    //get ids
    var dataId = val.resourceURI;
    return dataId;
  });

  // console.log(data);

  // matchObj is for setting the character state
  var matchObj = [];
  // leftOverObj is for setting the leftover characters not in local storage
  var leftOverObj = [];

  data.map((val, i) => {
    var match = false;
    storage.data.map((arr, j) => {
      // console.log(typeof arr.id);
      if(arr.resourceURI === val){
        // console.log(`match`);
        // console.log(arr);
        matchObj.push(arr);
        match = true;
      }
    });
    // console.log(match);

    //push leftovers to w to get the rest of the characters
    if(match == false){
      leftOverObj.push(val);
    }
  });

  var storageArr = storage.data;

  // console.log(leftOverObj);
  if(leftOverObj.length !== 0){
    //get the rest of the characters

    leftOverObj.map((val, i) => {
      fetch(`${val}?apikey=${Api}`).then(res => res.json()).then((results) => {
        // console.log(results);
        var theData = results.data.results[0];
        matchObj.push(theData);

        storageArr.push(theData);

        var arr = [matchObj, storageArr];

        return arr;

      }).then((arr) => {
        var setstorage = JSON.stringify(storage);

        if(str == `characters`){
          // console.log(`this is characters`);
          $this.setState({
            characters: arr[0]
          });

          localStorage.setItem("characters", setstorage);
        } else if(str == `events`){
          // console.log(`this is characters`);
          $this.setState({
            events: arr[0]
          });

          localStorage.setItem("events", setstorage);
        } else if(str == `comics`){
          // console.log(`this is characters`);
          $this.setState({
            comics: arr[0]
          });

          localStorage.setItem("comics", setstorage);
        } else if(str == `series`){
          // console.log(`this is characters`);
          $this.setState({
            series: arr[0]
          });

          localStorage.setItem("series", setstorage);
        } else if(str == `stories`){
          // console.log(`this is characters`);
          $this.setState({
            stories: arr[0]
          });

          localStorage.setItem("stories", setstorage);
        } else if(str == `creators`){
          // console.log(`this is characters`);
          $this.setState({
            creators: arr[0]
          });

          localStorage.setItem("creators", setstorage);
        }
      });
    })

  } else {
    if(str == `characters`){
      // console.log(`already characters`);
      $this.setState({
        characters: matchObj
      });
    } else if(str == `events`){
      // console.log(`this is characters`);
      $this.setState({
        events: matchObj
      });
    } else if(str == `comics`){
      // console.log(`this is characters`);
      $this.setState({
        comics: matchObj
      });
    } else if(str == `series`){
      // console.log(`this is characters`);
      $this.setState({
        series: matchObj
      });
    } else if(str == `stories`){
      // console.log(`this is characters`);
      $this.setState({
        stories: matchObj
      });
    } else if(str == `creators`){
      // console.log(`this is characters`);
      $this.setState({
        creators: matchObj
      });
    }
  }

};

export {setObj}

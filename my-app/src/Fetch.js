function Fetch(url, str) {
  return fetch(url).then(res => res.json()).then((results) => {
      // console.log('from homePage after ajax comics');
      // console.log(results);
      var theData = {data: results.data.results, offset: results.data.limit}
      // console.log(comics);
      theData = JSON.stringify(theData);
      localStorage.setItem(str, theData);
      return results;
      // console.log(this.state);
  }, (error) => {
      console.log(error);
  });
}

export {Fetch}

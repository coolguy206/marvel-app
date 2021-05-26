function setStorage(str) {
  //console.log(`set local storage`);
  var data = localStorage.getItem(str);
  data = JSON.parse(data);
  //console.log(data);
  return data;
}

export {setStorage}

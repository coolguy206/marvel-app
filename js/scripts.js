import {
  copyright
} from './copyright';
import {
  Api
} from './api';
import $ from 'jquery';


console.log($);

$(document).ready(function() {
  // console.log('yo')
  copyright();

  const baseURL = `https://gateway.marvel.com/`;
  let url = `${baseURL}comics?apikey=${Api}`
  console.log(url);

  fetch(url)
    .then(res => res.json()).then((result) => {
      // console.log('from homePage after ajax');
      console.log(result);

      // console.log(this.state);
    }, (error) => {
      console.log(error);
    })

});
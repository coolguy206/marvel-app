import $ from 'jquery';

const copyright = () => {
  let d = new Date();
  let year = d.getFullYear();
  let html = `&copy; ${year}`;
  $('.footer span').html(html);
};

export {
  copyright
}
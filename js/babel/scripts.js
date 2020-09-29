"use strict";

var _copyright = require("./copyright");

var _api = require("./api");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_jquery.default);
(0, _jquery.default)(document).ready(function () {
  // console.log('yo')
  (0, _copyright.copyright)();
  var baseURL = "https://gateway.marvel.com/";
  var url = "".concat(baseURL, "comics?apikey=").concat(_api.Api);
  console.log(url);
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (result) {
    // console.log('from homePage after ajax');
    console.log(result); // console.log(this.state);
  }, function (error) {
    console.log(error);
  });
});

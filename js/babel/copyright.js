"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyright = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var copyright = function copyright() {
  var d = new Date();
  var year = d.getFullYear();
  var html = "&copy; ".concat(year);
  (0, _jquery.default)('.footer span').html(html);
};

exports.copyright = copyright;

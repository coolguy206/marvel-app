module.exports = {

  options: {
    livereload: true
  },

  dist: {
    files: ['css/*.less', 'html/*.html', 'js/*.js'],
    tasks: ['less', 'purifycss', 'babel', 'browserify', 'uglify', 'includes','copy'],
  },

};
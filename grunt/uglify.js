module.exports = {

  options: {
    compress: true,
    // sourceMap: true
  },

  dist: {
    //dynamic files
    expand: true,
    cwd: 'js/browserify/',
    src: ['*.js'],
    dest: 'js/uglify/',
    ext: '.js',
  },


};
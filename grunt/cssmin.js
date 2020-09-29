module.exports = {

  options: {
    //sourceMap:true,
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'css/',
      src: '*.css',
      dest: 'css/cssmin/',
      ext: '.css'
    }]
  },

};
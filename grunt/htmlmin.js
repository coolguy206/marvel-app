module.exports = {
  options: {
    removeComments: true,
    collapseWhitespace: true
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'html/',
      src: '*.html',
      dest: 'html/htmlmin/'
    }]
  },

};
module.exports = {

  options: {
    // sourceMap: true,
    compress: true,
  },

  dist: {
    expand: true,
    cwd: 'css/',
    src: '*.less',
    dest: 'css/less/',
    ext: '.css',
  },

};
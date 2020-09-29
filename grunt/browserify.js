module.exports = function(grunt) {
  return {

    options: {
      // sourceMap: true
    },
    dist: {
      files: [{
        expand: true,
        cwd: 'js/babel',
        src: '*.js',
        dest: 'js/browserify/',

      }]
    }

  }
};
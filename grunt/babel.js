module.exports = {

    options: {
        // sourceMap: true,
        presets: ['@babel/preset-env'],
        // presets: ["@babel/preset-react"]
    },

    dist: {
        files: [{
            expand: true,
            cwd: 'js/',
            src: '*.js',
            dest: 'js/babel/'
        }]
    },


};
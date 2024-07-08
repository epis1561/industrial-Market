module.exports = {
    apps: [
        {
            name: 'market.honest-family.com',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            port: 3022, // yoru app port
            instances: 'max',
            exec_mode: 'cluster',
            cwd: './'
        }
    ]
};

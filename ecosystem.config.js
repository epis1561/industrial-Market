module.exports = {
    apps: [
        {
            name: 'industrialmarket.biz',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            port: 3024, // yoru app port
            instances: 'max',
            exec_mode: 'cluster',
            cwd: './'
        }
    ]
};

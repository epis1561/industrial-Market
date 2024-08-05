module.exports = {
    apps: [
        {
            name: process.env.SITE_NAME || 'industrialmarket.biz',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            port: process.env.PORT || 3025, // yoru app port
            instances: 'max',
            exec_mode: 'cluster',
            cwd: './'
        }
    ]
};

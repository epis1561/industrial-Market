let baseUrl = process.env.NODE_ENV === "production" ? "https://api.cherivu.co.kr" : "http://localhost:80";

export default {
    target: "client",
    server: {
        port: 3022
    },
    ssr: false,
    head: {
        title: '체리뷰',
        htmlAttrs: {
            lang: 'ko'
        },
        meta: [
            {property: 'og:title', content: '체리뷰'},
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
            {hid: 'description', name: 'description', content: ''},
            {property: 'og:description', content: ''},
            {name: 'format-detection', content: 'telephone=no'},

            {name: 'naver-site-verification', content: ''},
            {name: 'google-site-verification', content: ''},

            {property: 'og:image', content: '/images/kakao-img.png'},
            {property: 'keywords', content: ''},
            {property: 'og:url', content: ''},
            /*

            {property: 'og:site_name', content: '우리뷰 | 우리가 만드는 모든 리뷰 우리뷰'},
            {property: 'description', content: '우리가 만드는 모든 리뷰 우리뷰'},
            {property: 'og:type', content: 'wooriview'},
             */
        ],
        script: [
            {src: "//code.jquery.com/jquery-1.12.4.js"},
            {src: "/js/swiper.min.js"},
            {src: "/js/common.js"},
            {src: "//cdn.iamport.kr/v1/iamport.js"},
            {src: "//unpkg.com/aos@2.3.1/dist/aos.js"},
            /*{src: "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"},*/
            /*{src: "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5e85237532da8edfc3cc9905f1abdd8c&libraries=services"},*/

            {src: "/js/datepicker.min.js"},
            {src: "//www.gstatic.com/charts/loader.js"},
            {src: "//gcore.jsdelivr.net/npm/chart.js"},
            {src: "//cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/1.4.0/chartjs-plugin-annotation.min.js"},
            {src: "//cdn.quilljs.com/1.3.6/quill.min.js"},
            {src: "//mattstow.com/experiment/responsive-image-maps/jquery.rwdImageMaps.min.js"},
            {src: "//dapi.kakao.com/v2/maps/sdk.js?appkey=80f9438ba9e9a5472e707e7c0dd96dd7&libraries=services&autoload=false"},
            {src: "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"},
            // {src: "/js/common.js"},
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},

            {rel: 'stylesheet', type: 'text/css', href: '/css/datepicker.css'},   {rel: 'stylesheet', type: 'text/css', href: '//cdn.quilljs.com/1.3.4/quill.snow.css'},
            {rel: 'stylesheet', type: 'text/css', href: '/css/swiper.min.css'},

            {rel: 'stylesheet', type: 'text/css', href: '//gcore.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css'},

            {rel: 'stylesheet', type: 'text/css', href: '/css/common.css'},
            {rel: 'stylesheet', type: 'text/css', href: '/css/style.css'},
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {
            src: "~plugins/axios.js"
        },
        {
            src: "~plugins/ga.js"
        },
    ],

    middlewares: [""],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
        "nuxt-lodash",
    ],

    axios: {
        baseUrl: baseUrl,
        credentials: true,
        /* proxy: true, */
    },
    /* proxy: {
        '/laravel': {
            target: baseUrl,
            pathRewrite: { '^/laravel': '/' }
        }
    }, */
    auth: {
        redirect: {
            login: "/login",
            callback: '/login',
            logout: "/login",
            // home: '/'
        },
        strategies: {
            laravelSanctum: {
                provider: 'laravel/sanctum',
                url: baseUrl,
                endpoints: {
                    login: {
                        url: '/api/login',
                        method: 'post'
                    },
                    logout: {
                        url: "/api/logout",
                        method: "post"
                    },
                }
            },
        },

        axios:true,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [
            'defu',
        ]
    },

    router: {

        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        }
    },
script:[
    {
        type:'text/javascript', src:'/js/jquery.js'
    }
]

}

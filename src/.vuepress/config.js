const path = require('path');
const lodash = require('lodash');
const dotenv = require('dotenv');

// Load the environment variables both from the .env file and the process scope.
//   In case of conflicts, the process value will win.
const env = {
    ...dotenv.config().parsed,
    ...process.env,
};

module.exports = {
    title: 'back2string.art',
    description: 'Doing string art to kill time in the lockdown..',
    base: '/',
    dest: 'dist',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.ico',
            },
        ],
        [
            'meta',
            {
                name: 'theme-color',
                content: '#660708',
            },
        ],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700|Open+Sans:400,700',
            },
        ],
    ],
    scss: {
        additionalData: '@import "@/theme/styles/_variables";',
    },
    configureWebpack: {
        resolve: {
            alias: {
                '~': path.resolve(__dirname, '../'),
                '@': path.resolve(__dirname, '.'),
            },
        },
    },
    chainWebpack: (config) => {
        config.module
            .rule('js')
            .use('babel-loader')
            .tap(options => Object.assign(options, {
                compact: false,
            }));
    },
    markdown: {
        anchor: {
            permalinkClass: 'Permalink',
            permalinkSymbol: '#',
        },
    },
    themeConfig: {
        env,
        logo: '/images/logo.svg',
        carouselImages: [
            '/images/carousel/IMG_1452.JPG',
            '/images/carousel/IMG_1453.JPG',
            '/images/carousel/IMG_1455.JPG',
            '/images/carousel/IMG_1456.JPG',
            '/images/carousel/IMG_1457.JPG',
            '/images/carousel/IMG_1459.JPG',
            '/images/carousel/IMG_1467.JPG',
            '/images/carousel/IMG_1493.JPG',
            '/images/carousel/IMG_1496.JPG',
            '/images/carousel/IMG_1497.JPG',
            '/images/carousel/IMG_1500.JPG',
            '/images/carousel/IMG_1501.JPG',
            '/images/carousel/IMG_1503.JPG',
            '/images/carousel/IMG_1504.JPG',
            '/images/carousel/IMG_1507.JPG',
            '/images/carousel/IMG_1512.JPG',
            '/images/carousel/IMG_1514.JPG',
            '/images/carousel/IMG_1516.JPG',
            '/images/carousel/IMG_1518.JPG',
        ],
        dateFormat: 'YYYY-MM-DD',
        errorTitle: 'Page Not Found',
        errorDescription: "Sorry, but we couldn't find the page you were looking for...",
        errorHint: 'Perhaps you can search for it or you can go back to the home page instead.',
        ga: true,
        seo: true,
        globalPagination: {
            lengthPerPage: 12,
        },
        sitemap: {
            hostname: 'https://back2string.art',
        },
        feed: {
            path: '/rss.xml',
            canonical_base: 'https://back2string.art',
            posts_directories: [ '/posts/' ],
            sort: entries => lodash.reverse(lodash.sortBy(entries, 'date')),
        },
        smoothScroll: true,
        paginationComponent: 'SimplePagination',
        frontmatters: [
            {
                id: 'tag',
                keys: [ 'tags' ],
                path: '/tag/',
            },
        ],
        directories: [
            {
                id: 'post',
                dirname: 'posts',
                path: '/',
                title: 'Recent',
                itemPermalink: '/:year/:month/:day/:slug',
                pagination: {
                    sorter: (prev, next) => {
                        if (prev.frontmatter.sticky) {
                            if (next.frontmatter.sticky) {
                                return prev.frontmatter.weight < next.frontmatter.weight
                                    ? -1
                                    : 1;
                            }
                            return -1;
                        }
                        if (next.frontmatter.sticky) {
                            if (prev.frontmatter.sticky) {
                                return prev.frontmatter.weight < next.frontmatter.weight
                                    ? -1
                                    : 1;
                            }
                            return 1;
                        }
                        // eslint-disable-next-line global-require
                        const moment = require('moment');
                        const prevTime = moment(prev.frontmatter.date);
                        const nextTime = moment(next.frontmatter.date);
                        return prevTime - nextTime > 0 ? -1 : 1;
                    },
                },
            },
            {
                id: 'page',
                dirname: 'pages',
                itemPermalink: '/:slug',
            },
        ],
        nav: [
            {
                text: 'Collections',
                link: '/tag/collection/',
            },
            {
                text: 'Posts',
                link: '/tag/post/',
            },
            {
                text: 'About',
                link: '/about/',
            },
        ],
        footer: {
            copyright: [
                {
                    text: `© ${new Date().getFullYear()} back2string.art`,
                    link: '/',
                },
                {
                    text: 'Developed by dvuckovic.com',
                    link: 'https://dvuckovic.com',
                },
            ],
            links: [
                {
                    text: 'Twitter',
                    link: 'https://twitter.com/milanavuckovic3',
                    icon: 'twitter',
                },
                {
                    text: 'Instagram',
                    link: 'https://instagram.com/back2string.art',
                    icon: 'instagram',
                },
                {
                    text: 'Github',
                    link: 'https://github.com/milanavuckovic',
                    icon: 'github',
                },
            ],
        },
    },
};

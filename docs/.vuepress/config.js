module.exports = {
  title: "Lishunyang's Blog",
  description: "Lishunyang's Blog",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'keywords', content: 'Javascript,HTTP,Nodejs,React' }]
  ],
  themeConfig: {
    logo: '/favicon.png',
    nav: [
      { text: 'About', link: '/about.html' },
    ],
  },
  base: '/blog/',
  shouldPrefetch: () => false,
  plugins: {
    'vuepress-plugin-zooming': {
      selector: '.content img',
      delay: 500,
      options: {
        zIndex: 10000,
      },
    },
  },
};

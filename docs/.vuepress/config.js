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
      { text: 'Github', link: 'https://github.com/southerncross' },
    ],
  },
  shouldPrefetch: () => false,
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-159928407-1'
      }
    ]
  ]
};

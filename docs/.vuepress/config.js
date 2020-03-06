module.exports = {
  title: 'Lishunyang Theme',
  description: "Lishunyang's Blog",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/assets/favicon.png' }],
    ['script', { async: true, src='https://www.googletagmanager.com/gtag/js?id=UA-159928407-1' }]
  ],
  themeConfig: {
    logo: '/assets/favicon.png',
    nav: [
      { text: 'Github', link: 'https://github.com/southerncross' },
    ],
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-159928407-1'
      }
    ]
  ]
};

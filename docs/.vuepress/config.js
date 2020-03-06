module.exports = {
  title: 'Lishunyang Theme',
  description: "Lishunyang's Blog",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  ],
  themeConfig: {
    logo: '/favicon.png',
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

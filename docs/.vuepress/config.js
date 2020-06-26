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
  plugins: {
    '@vuepress/google-analytics': {
      'ga': 'UA-159928407-1'
    },
    '@vssue/vuepress-plugin-vssue': {
      // set `platform` rather than `api`
      platform: 'github',
      locale: 'zh',
      // all other options of Vssue are allowed
      owner: 'southerncross',
      repo: 'blog',
      clientId: '2797003e5e35203c9d05',
      clientSecret: 'ec65896b3f509f599200d560eab102eaac984c55',
    },
  },
};

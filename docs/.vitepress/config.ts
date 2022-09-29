export default {
    lang: 'id-ID',
    title: 'Buku Panduan IoT',
    themeConfig: {
      sidebar: {
        '/': [
            {
              items: [
                { text: 'Prasyarat', link: '/prerequisite.md' },
                { text: 'RabbitMQ', link: '/rabbitmq.md' },
                { text: 'MongoDB', link: '/mongodb.md' },
              ]
            },
        ]
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/pr0ph0z' }
      ],
      footer: {
        message: 'Created by Radisha',
      }
    },
  }
  
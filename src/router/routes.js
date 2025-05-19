export const routes = {
    '/': {
      template: 'auth/auth',
      dataKey: null
    },
    '/register': {
      template: 'register/register',
      dataKey: null
    },
    '/chats': {
      template: 'chats/chats',
      dataKey: 'chats'
    },
    '/profile': {
      template: 'profile/profile',
      dataKey: 'profile'
    },
    '/404': {
      template: '404/404',
      dataKey: null
    },
    '/500': {
      template: '500/500',
      dataKey: null
    }
  };
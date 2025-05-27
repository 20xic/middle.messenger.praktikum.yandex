// main.js
import Handlebars from 'handlebars';
import { Router } from './router/Router';
import { routes } from './router/routes';
import { mockChats, mockProfile } from './mocks';
import './style.postcss';

async function initApp() {
  try {
    const componentTemplates = import.meta.glob('./components/**/*.hbs', {
      query: '?raw',
      import: 'default',
      eager: true
    });

    ['Button', 'Input', 'Link'].forEach(name => {
      const path = `./components/${name}/${name}.hbs`;
      const template = componentTemplates[path];
      if (template) {
        Handlebars.registerPartial(name, template);
      }
    });
    
    const router = new Router(routes, {
      chats: mockChats,
      profile: mockProfile
    });

    router.navigate(window.location.pathname || '/');

    document.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (e.target.classList.contains('auth-form')) {
        router.navigate('/chats');
      } else if (e.target.classList.contains('register-form')) {
        router.navigate('/');
      } else if (e.target.classList.contains('edit-profile-form')) {
        router.navigate('/profile');
      } else if (e.target.classList.contains('change-password-form')) {
        router.navigate('/profile');
      }
    });

    window.onunhandledrejection = (event) => {
      console.error('Unhandled rejection:', event.reason);
      router.navigate('/500');
    };

  } catch (error) {
    console.error('Application initialization failed:', error);
  }
}

initApp();

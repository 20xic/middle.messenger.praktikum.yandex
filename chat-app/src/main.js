import Handlebars from 'handlebars';
import { Router } from './router/Router';
import { routes } from './router/routes';
import { mockChats, mockProfile } from './mocks';
import './style.postcss';

async function initApp() {
  try {
    
    const components = await Promise.all([
      import('./components/Button/Button.hbs?raw'),
      import('./components/Input/Input.hbs?raw'),
      import('./components/Link/Link.hbs?raw')
    ]);

    components.forEach((component, index) => {
      const name = ['Button', 'Input', 'Link'][index];
      Handlebars.registerPartial(name, component.default);
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
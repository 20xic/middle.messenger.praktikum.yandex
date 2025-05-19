import Handlebars from 'handlebars';

const pageTemplates = import.meta.glob('../pages/**/*.hbs', {
  query: '?raw',
  import: 'default',
  eager: true
});

export class Router {
  constructor(routes, data) {
    this.routes = routes;
    this.data = data;
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('DOMContentLoaded', () => this.handleRoute());
    document.addEventListener('click', this.handleLinkClick.bind(this));
  }

  async handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/404'];
    
    try {
      const templateKey = `../pages/${route.template}.hbs`;
      const template = pageTemplates[templateKey];
      
      if (!template) {
        throw new Error(`Template not found: ${templateKey}`);
      }
      
      const render = Handlebars.compile(template);
      const dataKey = route.dataKey;
      const context = dataKey ? { [dataKey]: this.data[dataKey] } : {};
      document.getElementById('app').innerHTML = render(context);
      this.updateActiveLinks(path);
    } catch (error) {
      console.error('Render error:', error);
      this.navigate('/500');
    }
  }

  updateActiveLinks(currentPath) {
    document.querySelectorAll('a').forEach(link => {
      const linkPath = new URL(link.href).pathname;
      link.classList.toggle('active', linkPath === currentPath);
    });
  }
  handleError() {
    document.getElementById('app').innerHTML = `
      <h1>Application Error</h1>
      <a href="/">Go to main page</a>
    `;
  }

  getRouteData(dataKey) {
    return dataKey ? this.data[dataKey] || {} : {};
  }

  handleLinkClick(e) {
    const link = e.target.closest('a');
    if (link) {
      e.preventDefault();
      this.navigate(new URL(link.href).pathname);
    }
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
}
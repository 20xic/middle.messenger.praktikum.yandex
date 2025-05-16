import Handlebars from 'handlebars';

export class Router {
  constructor(routes, data) {
    this.routes = routes;
    this.data = data;
    this.init();
  }

  async loadTemplate(templatePath) {
    try {
      const module = await import(/* @vite-ignore */ templatePath);
      return module.default;
    } catch (e) {
      console.error('Template load error:', e);
      throw new Error(`Template not found: ${templatePath}`);
    }
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
      const template = await this.loadTemplate(`/src/pages/${route.template}.hbs?raw`);
      const render = Handlebars.compile(template);
      const dataKey = route.dataKey;
      const context = dataKey ? { [dataKey]: this.data[dataKey] } : {};
      document.getElementById('app').innerHTML = render(context);
      this.updateActiveLinks(path);
    } catch (error) { 
      console.error('Render error:', error);
      this.handleError();
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
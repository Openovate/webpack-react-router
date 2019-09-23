const fs = require('fs');
const path = require('path');

const VirtualModulesPlugin = require('webpack-virtual-modules');

const link = fs
  .readFileSync(path.resolve(__dirname, 'Link.jsx'))
  .toString('utf8');

const clause = fs
  .readFileSync(path.resolve(__dirname, 'clause.js'))
  .toString('utf8');

const template = fs
  .readFileSync(path.resolve(__dirname, 'template.js'))
  .toString('utf8');

class ReactRouterPlugin {
  /**
   * Plugin Loader
   *
   * @param {Object} routes
   * @param {Object} links
   *
   * @return {ReactRouterPlugin}
   */
  static load(options) {
    return new ReactRouterPlugin(options);
  }

  /**
   * Preloads routes and links
   *
   * @param {Object} routes
   * @param {Object} links
   */
  constructor(options) {
    //this is the link component helper
    this.link = options.link || './Link.jsx';
    //this is the router path
    this.router = options.router || './router.js';
    // request path -> screen path
    this.routes = options.routes || {};
  }

  /**
   * Entry point for webpack plugin
   *
   * @param {Compiler} compiler
   */
  apply(compiler) {
    const router = {};
    router[this.link] = link;
    router[this.router] = this.generate();

    const modules = new VirtualModulesPlugin(router);
    modules.apply(compiler);
  }

  /**
   * Manually route a component to a path
   *
   * @param {String} path
   * @param {String} component
   *
   * @return {ReactRouterPlugin}
   */
  route(path, component) {
    this.routes[path] = component;
    return this;
  }

  /**
   * Generates the router code
   *
   * @return {String}
   */
  generate() {
    const code = template;
    const clauses = [];

    for(const route in this.routes) {
      clauses.push(
        clause
          .replace('{ROUTE}', route)
          .replace('{COMPONENT}', this.routes[route])
          .replace('{COMPONENT}', this.routes[route])
      );
    }

    return code.replace('{CLAUSES}', clauses.join(''));
  }
}

module.exports = ReactRouterPlugin;

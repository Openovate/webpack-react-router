const fs = require('fs');
const path = require('path');

const VirtualModulesPlugin = require('webpack-virtual-modules');
const VirtualFoldersPlugin = require('@openovate/webpack-virtual-folders');

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
  static load(context = '', routes = {}, links = {}) {
    return new ReactRouterPlugin(context, routes = {}, links = {});
  }

  /**
   * Preloads routes and links
   *
   * @param {Object} routes
   * @param {Object} links
   */
  constructor(context = '', routes = {}, links = {}) {
    //context is like the root working path
    this.context = context;
    // request path -> screen path
    this.routes = {};
    // target -> source
    this.links = {};
    //this is the router path
    this.router = path.join(this.context, 'router.js');

    Object.keys(routes).forEach(path => {
      this.route(path, routes[path]);
    });

    Object.keys(links).forEach(target => {
      this.route(target, links[target]);
    });
  }

  /**
   * Entry point for webpack plugin
   *
   * @param {Compiler} compiler
   */
  apply(compiler) {
    const router = {};
    router[this.router] = this.generate();

    const modules = new VirtualModulesPlugin(router);
    const folders = new VirtualFoldersPlugin(this.links);

    modules.apply(compiler);
    folders.apply(compiler);
  }

  /**
   * Manually link a folder to the build
   *
   * @param {String} target
   * @param {String} source
   *
   * @return {ReactRouterPlugin}
   */
  link(target, source) {
    target = path.join(this.context, target);
    this.links[target] = source;
    return this;
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
          .replace('{PATH}', route)
          .replace('{PATH}', this.routes[route])
      );
    }

    return code.replace('{CLAUSES}', clauses.join(''));
  }
}

module.exports = ReactRouterPlugin;

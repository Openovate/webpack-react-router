
    (() => {
      const route = {
        path: null,
        pattern: null,
        results: null,
        keys: [],
        args: [],
        params: {}
      };

      route.pattern = pathToRegexp('{ROUTE}', route.keys);
      route.results = route.pattern.exec(location.pathname);

      if (!route.results || !route.results.length) {
        return;
      }

      //full path
      route.path = route.results.shift();
      route.results.forEach((variable, i) => {
        if (!route.keys[i] || !route.keys[i].name) {
          return;
        }

        if (typeof route.keys[i].name === 'number') {
          route.args.push(variable);
          return;
        }

        route.params[route.keys[i].name] = variable;
      });

      import('{COMPONENT}').then(component => {
        component = component.default;
        this.setState({ component, route });
      })
    })();

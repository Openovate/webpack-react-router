
    if (location.pathname === '{PATH}') {
      import('{PATH}').then(component => {
        this.setState({ component: component.default });
      })
    }

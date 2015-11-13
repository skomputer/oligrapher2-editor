import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

const main = {
  run: function(config) {
    this.rootElement = config.root;

    this.rootInstance = ReactDOM.render(
      <Root config={config} />,
      this.rootElement
    );

    return this;
  },

  graph: function() {
    return this.rootInstance.oli;
  }
}

window.OligrapherEditor = main;

export default main;



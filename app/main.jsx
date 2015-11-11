import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

const main = {
  run: function(element, oligrapher) {
    this.rootElement = element;

    this.rootInstance = ReactDOM.render(
      <Root oligrapher={oligrapher} />,
      element
    );

    return this;
  },
}

window.OligrapherControls = main;

export default main;



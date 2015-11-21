import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { merge } from 'lodash';

export default class OligrapherEditor {
  constructor(config) {
    // editing enabled by default
    config = merge({ isEditor: true }, config);

    this.rootElement = config.domRoot;

    this.rootInstance = ReactDOM.render(
      <Root 
        oligrapher={config.oligrapher}
        data={config.data}
        dataSource={config.dataSource}
        isEditor={config.isEditor} 
        isLocked={config.isLocked} 
        onUpdate={config.onUpdate} />,
      this.rootElement
    );

    this.oligrapher = this.rootInstance.oli;

    return this;
  }

  toggleEditor(value) {
    this.rootInstance._toggleEditor(value);
    this.oligrapher.toggleEditor(value);
  }

  toggleLocked(value) {
    this.oligrapher.toggleLocked(value);
  }
};

window.OligrapherEditor = OligrapherEditor;


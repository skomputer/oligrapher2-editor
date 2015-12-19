import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { merge } from 'lodash';

export default class OligrapherEditor {
  constructor(config) {
    // editing enabled by default
    // view cropped to highlights by default
    config = merge({ isEditor: true, viewOnlyHighlighted: true, showEditButton: true }, config);

    this.rootElement = config.domRoot;

    this.rootInstance = ReactDOM.render(
      <Root {...config} />,
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

  toggleEditTools(value) {
    this.rootInstance._toggleEditTools(value);
  }
};

window.OligrapherEditor = OligrapherEditor;


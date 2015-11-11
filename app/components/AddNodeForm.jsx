import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class AddNodeForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit');
  }

  render() {
    return (
      <div id="addNode" className="editForm">
        <h3>Add Node</h3>
        <input type="text" id="addNodeName" placeholder="name" ref="name" /><br />
        <button id="addNodeButton" onClick={this._handleSubmit}>Add</button>
      </div>
    );
  }

  _handleSubmit() {
    let name = this.refs.name.value.trim();
    this.props.addNode({ display: { name } });
    this._clear();
  }

  _clear() {
    this.refs.name.value = '';
  }
}
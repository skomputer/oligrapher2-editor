import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class AddCaptionForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit');
  }

  render() {
    return (
      <div id="addCaption" className="editForm">
        <h3>Add Caption</h3>
        <input type="text" placeholder="name" ref="text" /><br />
        <button onClick={this._handleSubmit}>Add</button>
      </div>
    );
  }

  _handleSubmit() {
    let text = this.refs.text.value.trim();
    this.props.addCaption({ display: { text } });
    this._clear();
  }

  _clear() {
    this.refs.text.value = '';
  }
}
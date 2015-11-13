import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { HotKeys } from 'react-hotkeys';

export default class AddCaptionForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit');
  }

  render() {
    const keyMap = { 
      'altN': ['alt+n', 'ctrl+n'],
      'esc': 'esc'
    };

    const keyHandlers = {
      'altN': () => this.props.closeAddForm(),
      'esc': () => this.props.closeAddForm()
    };

    return (
      <div id="addCaption" className="editForm">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>  
          <h3>Add Caption</h3>
          <form onSubmit={this._handleSubmit}>
            <input type="text" placeholder="text" ref="text" /><br />
            <button type="submit">Add</button>
          </form>
        </HotKeys>
      </div>
    );
  }

  _handleSubmit(e) {
    let text = this.refs.text.value.trim();
    this.props.addCaption({ display: { text } });
    this._clear();
    e.preventDefault();
  }

  _clear() {
    this.refs.text.value = '';
  }
}
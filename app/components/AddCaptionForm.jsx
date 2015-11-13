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
      'esc': 'esc'
    };

    const keyHandlers = {
      'esc': () => this.props.closeAddForm()
    };

    return (
      <div id="addCaption" className="editForm">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>  
          <form onSubmit={this._handleSubmit}>
            <input type="text" className="form-control input-sm" placeholder="add caption" ref="text" /><br />
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
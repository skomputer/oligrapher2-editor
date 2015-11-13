import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { HotKeys } from 'react-hotkeys';
import { merge } from 'lodash';

export default class UpdateNodeForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_apply', '_handleNameChange', '_handleImageChange');
    this.state = this.props.data.display;
  }

  render() {
    const keyMap = { 
      'esc': 'esc'
    };

    const keyHandlers = {
      'esc': () => this.props.deselect()
    };

    const scales = [
      [1, "1x"],
      [1.5, "1.5x"],
      [2, "2x"],
      [3, "3x"]
    ];

    return (
      <div className="editForm form-inline">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <input 
            type="text" 
            className="form-control input-sm"
            placeholder="name" 
            ref="name" 
            value={this.state.name}
            onChange={this._handleNameChange} />
          &nbsp;<input 
            type="text" 
            className="form-control input-sm"
            placeholder="image URL" 
            ref="image" 
            value={this.state.image}
            onChange={this._handleImageChange} />
          &nbsp;<select value={this.state.scale} className="form-control input-sm" ref="scale" onChange={this._apply}>
            { scales.map((scale, i) =>
              <option key={i} value={scale[0]}>{scale[1]}</option>
            ) }
          </select>
        </HotKeys>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    this.setState(merge({ name: null, image: null, scale: null }, props.data.display));
  }

  _handleNameChange(event) {
    this._handleChange(event, 'name');
  }

  _handleImageChange(event) {
    this._handleChange(event, 'image');
  }

  _handleChange(event, field) {
    this.setState({ [field]: event.target.value });
    this._apply();
  }

  _apply() {
    if (this.props.data) {
      let name = this.refs.name.value.trim();
      let image = this.refs.image.value.trim();
      let scale = parseFloat(this.refs.scale.value);
      this.props.updateNode(this.props.data.id, { display: { name, image, scale } });      
    }
  }
}
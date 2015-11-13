import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { HotKeys } from 'react-hotkeys';

export default class UpdateNodeForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_apply');
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

    const selectedScale = this.props.data ? this.props.data.display.scale : null;

    return (
      <div className="editForm form-inline">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <input 
            type="text" 
            className="form-control input-sm"
            placeholder="name" 
            ref="name" 
            defaultValue={this.props.data.display.name} 
            onChange={this._apply} />
          &nbsp;<input 
            type="text" 
            className="form-control input-sm"
            placeholder="image URL" 
            ref="image" 
            defaultValue={this.props.data.display.image} 
            onChange={this._apply} />
          &nbsp;<select defaultValue={selectedScale} className="form-control input-sm" ref="scale" onChange={this._apply}>
            { scales.map((scale, i) =>
              <option key={i} value={scale[0]}>{scale[1]}</option>
            ) }
          </select>
        </HotKeys>
      </div>
    );
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
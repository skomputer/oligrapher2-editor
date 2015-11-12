import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class UpdateCaptionForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_apply');
  }

  render() {
    const scales = [
      [null, "Scale"],
      [1, "1x"],
      [1.5, "1.5x"],
      [2, "2x"],
      [3, "3x"]
    ];

    const selectedScale = this.props.data ? this.props.data.display.scale : null;

    return (
      <div className="editForm">
        <h3>Edit Caption</h3>
        <input 
          type="text" 
          placeholder="name" 
          ref="text" defaultValue={this.props.data.display.text} 
          onChange={this._apply} /><br />
        <select defaultValue={selectedScale} ref="scale" onChange={this._apply}>
          { scales.map((scale, i) =>
            <option key={i} value={scale[0]}>{scale[1]}</option>
          ) }
        </select><br />
      </div>
    );
  }

  _apply() {
    if (this.props.data) {
      let text = this.refs.text.value.trim();
      let scale = parseFloat(this.refs.scale.value);
      this.props.updateCaption(this.props.data.id, { display: { text, scale } });
    }
  }
}
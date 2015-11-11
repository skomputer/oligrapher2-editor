import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class UpdateCaptionForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit');
  }

  render() {
    const scales = [
      [null, "Scale"],
      [1, "1x"],
      [1.5, "1.5x"],
      [2, "2x"],
      [3, "3x"]
    ];

    const selectedScale = this.props.selection ? this.props.selection.display.scale : null;

    return (
      <div className="editForm">
        <h3>Update Caption</h3>
        <input type="text" placeholder="name" ref="text" defaultValue={this.props.selection.display.text} /><br />
        <select defaultValue={selectedScale} ref="scale">
          { scales.map((scale, i) =>
            <option key={i} value={scale[0]}>{scale[1]}</option>
          ) }
        </select><br />
        <button onClick={this._handleSubmit}>Update</button>
      </div>
    );
  }

  _handleSubmit() {
    if (this.props.selection) {
      let text = this.refs.text.value.trim();
      let scale = parseInt(this.refs.scale.value);
      this.props.updateCaption(this.props.selection.id, { display: { text, scale } });
    }
  }
}
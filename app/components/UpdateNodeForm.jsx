import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class UpdateNodeForm extends BaseComponent {
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
    console.log(this.props.data.display.name, this.props.data.display.scale);

    return (
      <div className="editForm">
        <h3>Edit Node</h3>
        <input 
          type="text" 
          placeholder="name" 
          ref="name" 
          value={this.props.data.display.name} 
          onChange={this._apply} /><br />
        <input 
          type="text" 
          placeholder="image URL" 
          ref="image" 
          value={this.props.data.display.image} 
          onChange={this._apply} /><br />
        <select value={selectedScale} ref="scale" onChange={this._apply}>
          { scales.map((scale, i) =>
            <option key={i} value={scale[0]}>{scale[1]}</option>
          ) }
        </select><br />
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
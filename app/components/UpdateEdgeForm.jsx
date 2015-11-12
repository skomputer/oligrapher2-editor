import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { values, sortBy } from 'lodash';

export default class UpdateEdgeForm extends BaseComponent {
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

    const display = this.props.data.display;
    const selectedScale = this.props.data ? display.scale : null;

    return (
      <div className="editForm">
        <h3>Edit Edge</h3>
        <input 
          type="text" 
          placeholder="label" 
          ref="label" 
          defaultValue={display.label} 
          onChange={this._apply} /><br />
        <input 
          type="checkbox" 
          ref="arrow" 
          defaultChecked={display.arrow} 
          onChange={this._apply} /> arrow<br />
        <input 
          type="checkbox" 
          ref="dash" 
          defaultChecked={display.dash} 
          onChange={this._apply} /> dash<br />
        <select defaultValue={selectedScale} ref="scale" onChange={this._apply}>
          { scales.map((scale, i) =>
            <option key={i} value={scale[0]}>{scale[1]}</option>
          ) }
        </select>
      </div>
    );
  }

  componentWillMount() {
    let nodes = sortBy(values(this.props.getGraph().nodes), (node) => node.display.name);
    this.setState({ nodes })    
  }

  componentWillReceiveProps(props) {
    let nodes = sortBy(values(props.getGraph().nodes), (node) => node.display.name);
    this.setState({ nodes })
  }

  _apply() {
    if (this.props.data) {
      let label = this.refs.label.value.trim();
      let arrow = this.refs.arrow.checked;
      let dash = this.refs.dash.checked;
      let scale = parseFloat(this.refs.scale.value);
      console.log(label, arrow, dash, scale);
      this.props.updateEdge(this.props.data.id, { display: { label, arrow, dash, scale } });
    }
  }
}
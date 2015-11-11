import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { values, sortBy } from 'lodash';

export default class UpdateEdgeForm extends BaseComponent {
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
        <h3>Update Edge</h3>
        <input type="text" placeholder="label" ref="label" defaultValue={this.props.selection.display.label} /><br />
        <select defaultValue={selectedScale} ref="scale">
          { scales.map((scale, i) =>
            <option key={i} value={scale[0]}>{scale[1]}</option>
          ) }
        </select><br />
        <button onClick={this._handleSubmit}>Update</button>
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

  _handleSubmit() {
    if (this.props.selection) {
      let label = this.refs.label.value.trim();
      let scale = parseInt(this.refs.scale.value);
      this.props.updateEdge(this.props.selection.id, { display: { label, scale } });
    }
  }
}
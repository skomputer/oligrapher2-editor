import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { HotKeys } from 'react-hotkeys';
import { values, sortBy } from 'lodash';

export default class UpdateEdgeForm extends BaseComponent {
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
      [null, "Scale"],
      [1, "1x"],
      [1.5, "1.5x"],
      [2, "2x"],
      [3, "3x"]
    ];

    const display = this.props.data.display;
    const selectedScale = this.props.data ? display.scale : null;

    return (
      <div className="editForm form-inline">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <input 
            type="checkbox" 
            ref="arrow" 
            defaultChecked={display.arrow} 
            onChange={this._apply} /> arrow
          &nbsp;&nbsp;<input 
            type="checkbox" 
            ref="dash" 
            defaultChecked={display.dash} 
            onChange={this._apply} /> dash
          &nbsp;&nbsp;<input 
            type="text" 
            className="form-control input-sm"
            placeholder="label" 
            ref="label" 
            defaultValue={display.label} 
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
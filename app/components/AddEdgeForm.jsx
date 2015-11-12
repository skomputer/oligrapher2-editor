import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { values, sortBy } from 'lodash';

export default class AddEdgeForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit');
    this.state = { nodes: [] }
  }

  render() {
    let node1Id = this.props.data ? this.props.data.id : null;

    return (
      <div className="editForm">
        <h3>Add Edge</h3>
        <select defaultValue={node1Id} ref="node1Id">
          <option value="">Node 1</option>
          { this.state.nodes.map((node, i) =>
            <option key={i} value={node.id}>{node.display.name}</option>
          ) }
        </select><br />
        <select ref="node2Id">
          <option value="">Node 2</option>
          { this.state.nodes.map((node, i) =>
            <option key={i} value={node.id}>{node.display.name}</option>
          ) }
        </select><br />
        <input type="text" placeholder="label" ref="label" /><br />
        <button onClick={this._handleSubmit}>Add</button>
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

  componentDidMount() {

  }

  _handleSubmit() {
    let node1Id = this.refs.node1Id.value;
    let node2Id = this.refs.node2Id.value;
    let label = this.refs.label.value.trim();
    this.props.addEdge({ node1_id: node1Id, node2_id: node2Id, display: { label } });
    this._clear();
  }

  _clear() {
    this.refs.node1Id.value = '';
    this.refs.node2Id.value = '';
    this.refs.label.value = '';
  }
}
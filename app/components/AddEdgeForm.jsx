import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import { values, sortBy } from 'lodash';
import { HotKeys } from 'react-hotkeys';

export default class AddEdgeForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit');
    this.state = { nodes: [] }
  }

  render() {
    let node1Id, node2Id;

    if (Array.isArray(this.props.data) && this.props.data.length == 2) {
      node1Id = this.props.data[0].id;
      node2Id = this.props.data[1].id;
    } else {
      node1Id = this.props.data ? this.props.data.id : null;
      node2Id = null;
    }

    console.log(node1Id, node2Id);

    const keyMap = { 
      'altN': ['alt+n', 'ctrl+n'],
      'esc': 'esc'
    };

    const keyHandlers = {
      'altN': () => this.props.closeAddForm(),
      'esc': () => this.props.closeAddForm()
    };

    return (
      <div className="editForm">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <h3>Add Edge</h3>
          <form onSubmit={this._handleSubmit}>
            <select defaultValue={node1Id} ref="node1Id">
              <option value="">Node 1</option>
              { this.state.nodes.map((node, i) =>
                <option key={i} value={node.id}>{node.display.name}</option>
              ) }
            </select><br />
            <select defaultValue={node2Id} ref="node2Id">
              <option value="">Node 2</option>
              { this.state.nodes.map((node, i) =>
                <option key={i} value={node.id}>{node.display.name}</option>
              ) }
            </select><br />
            <input type="text" placeholder="label" ref="label" /><br />
            <button type="submit">Add</button>
          </form>
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

  componentDidMount() {

  }

  _handleSubmit(e) {
    let node1Id = this.refs.node1Id.value;
    let node2Id = this.refs.node2Id.value;
    let label = this.refs.label.value.trim();
    this.props.addEdge({ node1_id: node1Id, node2_id: node2Id, display: { label } });
    this._clear();
    e.preventDefault();
    this.props.closeAddForm();
  }

  _clear() {
    this.refs.node1Id.value = '';
    this.refs.node2Id.value = '';
    this.refs.label.value = '';
  }
}
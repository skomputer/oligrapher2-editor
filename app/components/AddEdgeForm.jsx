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

    const keyMap = { 
      'altN': ['alt+n', 'ctrl+n'],
      'esc': 'esc'
    };

    const keyHandlers = {
      'altN': () => this.props.closeAddForm(),
      'esc': () => this.props.closeAddForm()
    };

    return (
      <div id="addEdgeForm" className="editForm">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <form onSubmit={this._handleSubmit}>
            <select defaultValue={node1Id} className="form-control input-sm" ref="node1Id">
              <option value="">Node 1</option>
              { this.state.nodes.map((node, i) =>
                <option key={i} value={node.id}>{node.display.name}</option>
              ) }
            </select>
            <select defaultValue={node2Id} className="form-control input-sm" ref="node2Id">
              <option value="">Node 2</option>
              { this.state.nodes.map((node, i) =>
                <option key={i} value={node.id}>{node.display.name}</option>
              ) }
            </select>
            <input type="text" placeholder="label" className="form-control input-sm" ref="label" />
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

  _handleSubmit(e) {
    let node1Id = this.refs.node1Id.value;
    let node2Id = this.refs.node2Id.value;
    let label = this.refs.label.value.trim();

    if (node1Id && node2Id && label) {
      this.props.addEdge({ node1_id: node1Id, node2_id: node2Id, display: { label } });
      this._clear();
      this.props.closeAddForm();      
    }

    e.preventDefault();
  }

  _clear() {
    this.refs.node1Id.value = '';
    this.refs.node2Id.value = '';
    this.refs.label.value = '';
  }
}
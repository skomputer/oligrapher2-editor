import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import AddNodeResult from './AddNodeResult';
import { HotKeys } from 'react-hotkeys';

export default class AddNodeInput extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit', '_handleSearch');
    this.state = { results: [] };
  }

  render() {
    // filter existing nodes out of results
    const results = this.state.results.filter(node => !this.props.nodes[node.id]);

    const keyMap = { 
      'esc': 'esc'
    };

    const keyHandlers = {
      'esc': () => this._clear()
    };

    return (
      <div id="addNodeInput">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <form onSubmit={this._handleSubmit}>
            <input autoFocus type="text" className="form-control input-sm" placeholder="add node" ref="name" onChange={this._handleSearch} /><br />
            { this.props.source && results.length > 0 ? 
              <ul className="addNodeResults dropdown-menu">
                { results.map((node, i) =>
                  <AddNodeResult 
                    key={i} 
                    node={node} 
                    source={this.props.source} 
                    nodes={this.props.nodes} 
                    addNode={this.props.addNode}
                    addEdge={this.props.addEdge} />
                  ) }
              </ul> : null }
          </form>
        </HotKeys>
      </div>
    );
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  _handleSubmit(e) {
    let name = this.refs.name.value.trim();
    this.props.addNode({ display: { name } });
    this._clear();
    this.props.closeAddForm();
    e.preventDefault();
  }

  _handleSearch() {
    // text and source required for search
    if (this.props.source) {
      let that = this;

      // cancel previously queued search
      window.clearTimeout(this.timeout);

      // queue new search
      this.timeout = setTimeout(() => {
        let query = that.refs.name.value.trim();

        if (query) {
          that.props.source.findNodes(query, nodes => that._addResults(nodes));          
        } else {
          this.setState({ results: [] })
        }
      }, 200);
    }
  }

  _addResults(nodes) {
    // console.log(nodes);
    this.setState({ results: nodes });
  }

  _clear() {
    this.refs.name.value = '';
    this.setState({ results: [] });
  }
}
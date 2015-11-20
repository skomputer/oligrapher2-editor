import React, { Component, PropTypes } from 'react';
import AddNodeInput from './AddNodeInput';

export default class EditButtons extends Component {

  render() {
    return (
      <div id="editButtons" className="form-inline buttonGroup">
        <AddNodeInput 
          ref="addNodeInput"
          addNode={this.props.addNode}
          addEdge={this.props.addEdge}
          closeAddForm={this.props.closeAddForm} 
          source={this.props.source} 
          nodes={this.props.nodes} 
          ref="addNodeInput" />
        <button className="btn btn-sm btn-default" onClick={this.props.toggleAddEdgeForm}>add edge</button>
      </div>
    );
  }
}

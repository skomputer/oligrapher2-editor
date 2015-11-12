import React, { Component, PropTypes } from 'react';

export default class LayoutButtons extends Component {

  render() {
    return (
      <div id="layoutButtons">
        <button onClick={this.props.prune}>prune</button>
        <button onClick={this.props.circleLayout}>circle</button>
      </div>
    );
  }
}
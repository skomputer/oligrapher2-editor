import React, { Component, PropTypes } from 'react';

export default class ZoomButtons extends Component {

  render() {
    return (
      <div id="zoomButtons">
        <button onClick={this.props.zoomIn}>zoom in</button>
        <button onClick={this.props.zoomOut}>zoom out</button>   
        <button onClick={this.props.resetZoom}>reset zoom</button>
      </div>
    );
  }
}
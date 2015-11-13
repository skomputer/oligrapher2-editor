import React, { Component, PropTypes } from 'react';

export default class HelpScreen extends Component {

  render() {
    return (
      <div id="helpScreen">
        <h3>User Guide</h3>
        Type a name in the "add node" box and press enter to add the node to the graph. 
        { this.props.source ? ` Nodes from ${this.props.source.name} matching the name you type will appear below; click on them to add them to the graph; all edges connecting it to nodes already in the graph will be added too.` : "" }
        <br />
        <br />
        <strong>Buttons</strong><br />
        <br />
        The "circle" button arranges nodes in a circle.<br />
        The "prune" button removes unconnected nodes.<br />
        The "clear" button deletes all content from the graph.<br />
        <br />
        <strong>Shortcut Keys</strong><br />
        <br />
        ALT+CLICK a node or edge to select or deselect it.<br />
        <br />
        ALT+D deletes a selected node or edge<br />
        ALT+E adds an edge.<br />
        ALT+C adds a caption.<br />
        <br />
        If ALT keys interfere with your browser or operating system shortcuts, all of the above shortcuts will work with CTRL instead of ALT<br />
        <br />
        CTRL+"=" zooms in.<br />
        CTRL+"-" zooms out.<br />
        CTRL+0 resets zoom.<br />
        <br />
        <strong>Editing Nodes and Edges</strong><br />
        <br />
        Select a node or edge to view an editing form in the top-right corner of the map. Changes you make to the edit form will upate the node or edge immediately.<br />
      </div>
    );
  }
}
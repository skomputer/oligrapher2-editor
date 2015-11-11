import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import ZoomButtons from './ZoomButtons';
import AddNodeForm from './AddNodeForm';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import UpdateNodeForm from './UpdateNodeForm';
import UpdateEdgeForm from './UpdateEdgeForm';
import UpdateCaptionForm from './UpdateCaptionForm';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { currentForm: null, selection: null };
  }

  render() {
    let oli = this.props.oligrapher;
    let zoomIn = () => oli.zoomIn();
    let zoomOut = () => oli.zoomOut();
    let addNode = (node) => oli.addNode(node);
    let addEdge = (edge) => oli.addEdge(edge);
    let addCaption = (caption) => oli.addCaption(caption);
    let getGraph = () => oli.export();
    let updateNode = (nodeId, data) => oli.updateNode(nodeId, data);
    let updateEdge = (edgeId, data) => oli.updateEdge(edgeId, data);
    let updateCaption = (captionId, data) => oli.updateCaption(captionId, data);

    const keyMap = { 
      'altN': 'alt+n',
      'altE': 'alt+e',
      'altC': 'alt+c',
      'esc': 'esc'
    };

    const keyHandlers = {
      'altN': () => this._toggleNodeForm(),
      'altE': () => this._toggleEdgeForm(),
      'altC': () => this._toggleCaptionForm(),
      'esc': () => this.setState({ currentForm: null })
    };

    let { currentForm, selection } = this.state;

    return (
      <div id="oligrapherControlsContainer" style={{ height: '100%' }}>
        <HotKeys focused={true} attach={window} keyMap={keyMap} handlers={keyHandlers}>
          <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
          { false && currentForm ? <div id="editFormScreen"></div> : null }
          { currentForm == 'AddNodeForm' ? 
            <AddNodeForm addNode={addNode} /> : null }
          { currentForm == 'AddEdgeForm' ? 
            <AddEdgeForm addEdge={addEdge} getGraph={getGraph} selection={selection} /> : null }
          { currentForm == 'AddCaptionForm' ? 
            <AddCaptionForm addCaption={addCaption} /> : null }
          { currentForm == 'UpdateNodeForm' ? 
            <UpdateNodeForm updateNode={updateNode} selection={selection} /> : null }
          { currentForm == 'UpdateEdgeForm' ? 
            <UpdateEdgeForm updateEdge={updateEdge} getGraph={getGraph} selection={selection} /> : null }
          { currentForm == 'UpdateCaptionForm' ? 
            <UpdateCaptionForm updateCaption={updateCaption} selection={selection} /> : null }
        </HotKeys>
      </div>
    );
  }

  componentDidMount() {
    // let root = ReactDOM.findDOMNode(this);
    // let elem = root.querySelector('#oligrapher');
    // this.oli = this.props.oligrapher.run(elem, this.props.config);
  }

  _toggleNodeForm() {
    let selected = this.props.oligrapher.getSelection().nodeIds;

    if (selected.length == 0) {
      this._toggleForm('AddNodeForm', null);
    } else if (selected.length == 1) {
      let node = this.props.oligrapher.export().nodes[selected[0]];
      this._toggleForm('UpdateNodeForm', node);
    }
  }

  _toggleEdgeForm() {
    let selection = this.props.oligrapher.getSelection();
    let data = this.props.oligrapher.export();
    let edgeIds = selection.edgeIds;
    let nodeIds = selection.nodeIds;

    if (edgeIds.length == 0) {
      let edge = (nodeIds.length == 1) ? { node1_id: nodeIds[0] } : null;
      this._toggleForm('AddEdgeForm', edge);
    } else if (edgeIds.length == 1) {
      let edge = data.edges[edgeIds[0]];
      this._toggleForm('UpdateEdgeForm', edge);
    }
  }

  _toggleCaptionForm() {
    let captionIds = this.props.oligrapher.getSelection().captionIds;

    if (captionIds.length == 0) {
      this._toggleForm('AddCaptionForm', null);
    } else if (captionIds.length == 1) {
      let caption = this.props.oligrapher.export().captions[captionIds[0]];
      this._toggleForm('UpdateCaptionForm', caption);
    }
  }

  _toggleForm(type, selection = null) {
    let newForm = (this.state.currentForm == type ? null : type);
    this.setState({ currentForm: newForm, selection });
  }
}
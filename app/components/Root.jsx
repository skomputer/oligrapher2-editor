import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import ZoomButtons from './ZoomButtons';
import LayoutButtons from './LayoutButtons';
import AddNodeForm from './AddNodeForm';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import UpdateNodeForm from './UpdateNodeForm';
import UpdateEdgeForm from './UpdateEdgeForm';
import UpdateCaptionForm from './UpdateCaptionForm';
import { values, cloneDeep } from 'lodash';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.initSelection = { nodes: {}, edges: {}, captions: {} };
    this.state = { addForm: null, selection: this.initSelection };
    this.currentForm = null;
    this.formData = null;
  }

  render() {
    let oli = this.props.oligrapher;
    
    let getGraph = () => this.oli.export();

    let { zoomIn, zoomOut, resetZoom, prune, circleLayout, 
          addNode, addEdge, addCaption, 
          updateNode, updateEdge, updateCaption } = this;

    const keyMap = { 
      'altZ': 'alt+z',
      'altP': 'alt+p',
      'altO': 'alt+o',
      'altN': 'alt+n',
      'altE': 'alt+e',
      'altC': 'alt+c',
      'esc': 'esc'
    };

    const keyHandlers = {
      'altZ': () => this.resetZoom(),
      'altP': () => this.prune(),
      'altO': () => this.circleLayout(),
      'altN': () => this._toggleAddForm('AddNodeForm'),
      'altE': () => this._toggleAddForm('AddEdgeForm'),
      'altC': () => this._toggleAddForm('AddCaptionForm'),
      'esc': () => this.setState({ addForm : null })
    };

    let data = cloneDeep(this.formData);
    let currentForm = this.state.addForm ? null : this.currentForm;
    console.log(data);

    return (
      <div id="oligrapherControlsContainer" style={{ height: '100%' }}>
        <HotKeys focused={true} attach={window} keyMap={keyMap} handlers={keyHandlers}>
          <div id="buttons">
            <button onClick={zoomIn}>zoom in</button>
            <button onClick={zoomOut}>zoom out</button>   
            <button onClick={resetZoom}>reset zoom</button>
            <button onClick={prune}>prune</button>
            <button onClick={circleLayout}>circle</button>
          </div>

          { false && currentForm ? <div id="editFormScreen"></div> : null }

          { this.state.addForm == 'AddNodeForm' ? 
            <AddNodeForm addNode={addNode} /> : null }
          { this.state.addForm == 'AddEdgeForm' ? 
            <AddEdgeForm addEdge={addEdge} getGraph={getGraph} data={data} /> : null }
          { this.state.addForm == 'AddCaptionForm' ? 
            <AddCaptionForm addCaption={addCaption} /> : null }
          { currentForm == 'UpdateNodeForm' ? 
            <UpdateNodeForm updateNode={updateNode} data={data} /> : null }
          { currentForm == 'UpdateEdgeForm' ? 
            <UpdateEdgeForm updateEdge={updateEdge} getGraph={getGraph} data={data} /> : null }
          { currentForm == 'UpdateCaptionForm' ? 
            <UpdateCaptionForm updateCaption={updateCaption} data={data} /> : null }
        </HotKeys>
      </div>
    );
  }

  componentWillMount() {
    let config = this.props.config;
    config.onSelection = (selection) => { 
      let count = values(selection.nodes).length + values(selection.edes).length + values(selection.captions).length;
      let addForm = (count > 0 ? null : this.state.addForm);
      this.setState({ selection, addForm  });
    };
    this.oli = config.oligrapher.run(config.oligrapherRoot, config);
  
    this.getGraph = () => this.oli.export();
    this.zoomIn = () => this.oli.zoomIn();
    this.zoomOut = () => this.oli.zoomOut();
    this.resetZoom = () => this.oli.resetZoom();
    this.prune = () => this.oli.prune();
    this.circleLayout = () => this.oli.circleLayout();
    this.addNode = (node) => this.oli.addNode(node);
    this.addEdge = (edge) => this.oli.addEdge(edge);
    this.addCaption = (caption) => this.oli.addCaption(caption);
    this.updateNode = (nodeId, data) => this.oli.updateNode(nodeId, data);
    this.updateEdge = (edgeId, data) => this.oli.updateEdge(edgeId, data);
    this.updateCaption = (captionId, data) => this.oli.updateCaption(captionId, data);
  }

  componentWillUpdate(nextProps, nextState) {
    this._toggleEditFormsFromSelection(nextState.selection);
  }

  _toggleEditFormsFromSelection(selection) {
    let { nodes, edges, captions } = selection;
    let nodeCount = Object.keys(nodes).length;
    let edgeCount = Object.keys(edges).length;
    let captionCount = Object.keys(captions).length;

    if (nodeCount == 1 && edgeCount == 0 && captionCount == 0) {
      this._showEditForm('UpdateNodeForm', values(nodes)[0]);
    } else if (nodeCount == 0 && edgeCount == 1 && captionCount == 0) {
      this._showEditForm('UpdateEdgeForm', values(edges)[0]);
    } else if (nodeCount == 0 && edgeCount == 0 && captionCount == 1) {
      this._showEditForm('UpdateCaptionForm', values(captions)[0]);
    } else {
      this.currentForm = null;
      this.formData = null;
    }
  }

  _showEditForm(type, data) {
    this.currentForm = type;
    this.formData = data;
  }

  _toggleAddForm(type) {
    let newForm = (this.state.addForm == type ? null : type);
    this.setState({ addForm: newForm });
  }
}
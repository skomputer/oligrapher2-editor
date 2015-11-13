import React, { Component, PropTypes } from 'react';
import { HotKeys } from 'react-hotkeys';
import BaseComponent from './BaseComponent';
import ZoomButtons from './ZoomButtons';
import LayoutButtons from './LayoutButtons';
import EditButtons from './EditButtons';
import AddNodeForm from './AddNodeForm';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import UpdateNodeForm from './UpdateNodeForm';
import UpdateEdgeForm from './UpdateEdgeForm';
import UpdateCaptionForm from './UpdateCaptionForm';
import HelpScreen from './HelpScreen';
import { values, cloneDeep } from 'lodash';

export default class Root extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_clearGraph', '_toggleAddEdgeForm', '_toggleHelpScreen');
    this.initSelection = { nodes: {}, edges: {}, captions: {} };
    this.state = { helpScreen: false, addForm: null, selection: this.initSelection, graph: this.initSelection };
    this.currentForm = null;
    this.formData = null;
  }

  render() {
    let oli = this.props.oligrapher;
    
    let getGraph = () => this.oli.export();

    let { zoomIn, zoomOut, resetZoom, prune, circleLayout, 
          addNode, addEdge, addCaption, 
          updateNode, updateEdge, updateCaption,
          deselectAll } = this;

    const keyMap = { 
      'altZ': ['alt+z', 'ctrl+z'],
      'altP': ['alt+p', 'ctrl+p'],
      'altO': ['alt+o', 'ctrl+o'],
      'altN': ['alt+n', 'ctrl+n'],
      'altE': ['alt+e', 'ctrl+e'],
      'altC': ['alt+c', 'ctrl+c'],
      'altH': ['alt+h', 'ctrl+h'],
      'esc': 'esc'
    };

    const keyHandlers = {
      'altZ': () => resetZoom(),
      'altP': () => prune(),
      'altO': () => circleLayout(),
      'altN': () => this._focusAddNodeInput(),
      'altE': () => this._toggleAddEdgeForm(),
      'altC': () => this._toggleAddCaptionForm(),
      'altH': () => this._toggleHelpScreen(),
      'esc': () => { this.setState({ addForm : null }); this.deselectAll(); }
    };

    let data = cloneDeep(this.formData);
    let currentForm = this.state.addForm ? null : this.currentForm;
    let closeAddForm = () => this.setState({ addForm: null });

    return (
      <div id="oligrapherEditorContainer" style={{ height: '100%' }}>
        <HotKeys focused={true} attach={window} keyMap={keyMap} handlers={keyHandlers}>
          <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
          <div id="buttons">
            <LayoutButtons prune={prune} circleLayout={circleLayout} clearGraph={this._clearGraph} />
            <button id="helpButton" className="btn btn-sm btn-default buttonGroup" onClick={this._toggleHelpScreen}>help</button>
            <EditButtons 
              addNode={addNode}
              addEdge={addEdge}
              closeAddForm={closeAddForm} 
              source={this.props.config.dataSource} 
              nodes={this.state.graph.nodes}
              toggleAddEdgeForm={this._toggleAddEdgeForm} 
              ref="editButtons" />
          </div>

          { this.state.addForm == 'AddEdgeForm' ? 
            <AddEdgeForm 
              addEdge={addEdge} 
              getGraph={getGraph} 
              closeAddForm={closeAddForm} 
              data={data} /> : null }
          { this.state.addForm == 'AddCaptionForm' ? 
            <AddCaptionForm 
              addCaption={addCaption} 
              closeAddForm={closeAddForm} /> : null }
          { currentForm == 'UpdateNodeForm' ? 
            <UpdateNodeForm 
              updateNode={updateNode} 
              data={data} 
              deselect={this.deselectAll} /> : null }
          { currentForm == 'UpdateEdgeForm' ? 
            <UpdateEdgeForm 
              updateEdge={updateEdge} 
              getGraph={getGraph} 
              data={data}
              deselect={this.deselectAll} /> : null }
          { currentForm == 'UpdateCaptionForm' ? 
            <UpdateCaptionForm 
              updateCaption={updateCaption} 
              data={data}
              deselect={this.deselectAll} /> : null }
          { this.state.helpScreen ? <HelpScreen source={this.props.config.dataSource} /> : null }
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

    config.onUpdate = (graph) => {
      this.setState({ graph });
    }

    this.oli = config.oligrapher.run(config.oligrapherRoot, config);
    this.setState({ graph: this.oli.export() });
  
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
    this.deselectAll = () => this.oli.deselectAll();
    this.deleteAll = () => this.oli.deleteAll();
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
    } else if (nodeCount == 2 && edgeCount == 0 && captionCount == 0) {
      this.currentForm = null;
      this.formData = values(nodes);
    } else {
      this.currentForm = null;
      this.formData = null;
    }
  }

  _showEditForm(type, data) {
    this.currentForm = type;
    this.formData = data;
  }

  _toggleAddEdgeForm() {
    this._toggleAddForm('AddEdgeForm');
  }

  _toggleAddCaptionForm() {
    this._toggleAddForm('AddCaptionForm');
  }

  _toggleAddForm(type) {
    let newForm = (this.state.addForm == type ? null : type);
    this.setState({ addForm: newForm, helpScreen: false });
  }

  _toggleHelpScreen() {
    this.setState({ addForm: null, helpScreen: !this.state.helpScreen });
  }

  _clearGraph() {
    if (confirm("Are you sure you want to clear the graph? This can't be undone!")) {
      this.deleteAll();
      this.currentForm = null;
      this.formData = null;
      this.setState({ addForm: null })
    }
  }

  _focusAddNodeInput() {
    this.refs.editButtons.refs.addNodeInput.refs.name.focus();
  }
}
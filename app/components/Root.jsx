import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import BaseComponent from './BaseComponent';
import ZoomButtons from './ZoomButtons';
import EditTools from './EditTools';
import { merge, values, cloneDeep, pick } from 'lodash';

export default class Root extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_clearGraph', '_toggleAddEdgeForm', '_toggleHelpScreen');
    this.initSelection = { nodes: {}, edges: {}, captions: {} };
    this.state = { helpScreen: false, addForm: null, showEditTools: false, selection: this.initSelection, graph: this.initSelection };
    this.currentForm = null;
    this.formData = null;
  }

  render() {
    let zoomIn, zoomOut, resetZoom;

    if (this.oli) {
      zoomIn = () => this.oli.zoomIn();
      zoomOut = () => this.oli.zoomOut();
      resetZoom = () => this.oli.resetZoom();    
    }

    const keyMap = { 
      'altZ': ['alt+z', 'ctrl+z'],
      'altP': ['alt+p', 'ctrl+p'],
      'altO': ['alt+o', 'ctrl+o'],
      'altN': ['alt+n', 'ctrl+n'],
      'altE': ['alt+e', 'ctrl+e'],
      'altC': ['alt+c', 'ctrl+c'],
      'altH': ['alt+h', 'ctrl+h'],
      'altR': ['alt+r', 'ctrl+r'],
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
      'altR': () => this._toggleAddConnectedNodesForm(),
      'esc': () => this._clearForms()
    };

    let data = cloneDeep(this.formData);
    let currentForm = this.state.addForm ? null : this.currentForm;
    let closeAddForm = () => this.setState({ addForm: null });

    return (
      <div id="oligrapherEditorContainer" style={{ height: '100%' }}>
        <HotKeys focused={true} attach={window} keyMap={keyMap} handlers={keyHandlers}>
          <div id="oligrapherEditorGraph" style={{ height: '100%' }}></div>
          <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
          { this.state.isEditor ? 
            <button 
              id="toggleEditTools" 
              className="btn btn-sm btn-default" 
              onClick={() => this._toggleEditTools()}>
              <span className="glyphicon glyphicon-pencil"></span>
            </button> : null }
          { this.oli && this.state.showEditTools ? 
            <EditTools
              closeAddForm={closeAddForm} 
              source={this.props.dataSource} 
              graph={this.state.graph}
              toggleAddEdgeForm={this._toggleAddEdgeForm}
              toggleHelpScreen={this._toggleHelpScreen}
              clearGraph={this._clearGraph}
              closeAddForm={closeAddForm} 
              data={data}
              graphApi={this.oli}
              addForm={this.state.addForm}
              currentForm={currentForm} 
              helpScreen={this.state.helpScreen} /> : null }       
        </HotKeys>
      </div>
    );
  }

  componentDidMount() {
    let element = ReactDOM.findDOMNode(this);
    let graphElement = element.querySelector("#oligrapherEditorGraph");
    graphElement.style.height = element.offsetHeight + "px";

    let config = merge({ isEditor: false, isLocked: false }, { 
      root: graphElement,
      data: this.props.data,
      isLocked: this.props.isLocked
    });

    config.onSelection = (selection) => { 
      let count = values(selection.nodeIds).length + values(selection.edgeIds).length + values(selection.captionIds).length;
      let addForm = (count > 0 ? null : this.state.addForm);
      this.setState({ selection, addForm });
    };

    config.onUpdate = (graph) => {
      this.setState({ graph });

      if (this.props.onUpdate) {
        this.props.onUpdate(graph);
      }
    }

    this.oli = new this.props.oligrapher(config);
    this.setState({ graph: this.oli.export(), isEditor: this.props.isEditor });
  }

  componentWillUpdate(nextProps, nextState) {
    let { nodeIds, edgeIds, captionIds } = nextState.selection;
    let graph = nextState.graph;
    let selection = {
      nodes: pick(graph.nodes, nodeIds),
      edges: pick(graph.edges, edgeIds),
      captions: pick(graph.captions, captionIds)
    }
    this._toggleEditFormsFromSelection(selection);
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

  _toggleAddConnectedNodesForm() {
    this._toggleAddForm('AddConnectedNodesForm');
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
      this.oli.deleteAll();
      this.currentForm = null;
      this.formData = null;
      this.setState({ addForm: null })
    }
  }

  _clearForms() {
    this.setState({ addForm : null }); 
    this.oli.deselectAll(); 
    this.refs.editorTools.refs.editButtons.refs.addNodeInput.clear();    
  }

  _toggleEditor(value) {
    this.setState({ isEditor: value })    
  }

  _toggleEditTools() {
    this.oli.toggleEditor(!this.state.showEditTools);
    this.setState({ showEditTools: !this.state.showEditTools });
  }

  _focusAddNodeInput() {
    this.refs.editorTools.refs.editButtons.refs.addNodeInput.refs.name.focus();
  }
}
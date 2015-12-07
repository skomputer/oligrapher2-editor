import React, { Component, PropTypes } from 'react';
import LayoutButtons from './LayoutButtons';
import EditButtons from './EditButtons';
import AddNodeForm from './AddNodeForm';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import AddConnectedNodesForm from './AddConnectedNodesForm';
import UpdateNodeForm from './UpdateNodeForm';
import UpdateEdgeForm from './UpdateEdgeForm';
import UpdateCaptionForm from './UpdateCaptionForm';
import HelpScreen from './HelpScreen';

export default class EditTools extends Component {

  render() {
    let { graphApi, source, data, graph, addForm, currentForm, helpScreen,
          clearGraph, closeAddForm, toggleHelpScreen, toggleAddEdgeForm } = this.props;

    let zoomIn, zoomOut, resetZoom, prune, circleLayout, 
        addNode, addEdge, addCaption, addSurroundingNodes,
        updateNode, updateEdge, updateCaption, deselectAll,
        deleteAll, getGraph;

    if (graphApi) {
      getGraph = () => graphApi.export();
      zoomIn = () => graphApi.zoomIn();
      zoomOut = () => graphApi.zoomOut();
      resetZoom = () => graphApi.resetZoom();
      prune = () => graphApi.prune();
      circleLayout = () => graphApi.circleLayout();
      addNode = (node) => graphApi.addNode(node);
      addEdge = (edge) => graphApi.addEdge(edge);
      addCaption = (caption) => graphApi.addCaption(caption);
      updateNode = (nodeId, data) => graphApi.updateNode(nodeId, data);
      updateEdge = (edgeId, data) => graphApi.updateEdge(edgeId, data);
      updateCaption = (captionId, data) => graphApi.updateCaption(captionId, data);
      deselectAll = () => graphApi.deselectAll();
      deleteAll = () => graphApi.deleteAll();
      addSurroundingNodes = (centerId, nodes) => graphApi.addSurroundingNodes(centerId, nodes);      
    }

    return (
      <div id="editTools">
        <div id="buttons">
          <LayoutButtons 
            prune={prune} 
            circleLayout={circleLayout} 
            clearGraph={clearGraph} />
          <button id="helpButton" className="btn btn-sm btn-default buttonGroup" onClick={toggleHelpScreen}>help</button>
          <EditButtons
            ref="editButtons"
            addNode={addNode}
            addEdge={addEdge}
            closeAddForm={closeAddForm} 
            source={source} 
            nodes={graph.nodes}
            toggleAddEdgeForm={toggleAddEdgeForm} />
        </div>

        { addForm == 'AddEdgeForm' ? 
          <AddEdgeForm 
            addEdge={addEdge} 
            getGraph={getGraph} 
            closeAddForm={closeAddForm} 
            data={data} /> : null }
        { addForm == 'AddCaptionForm' ? 
          <AddCaptionForm 
            addCaption={addCaption} 
            closeAddForm={closeAddForm} /> : null }
        { currentForm == 'UpdateNodeForm' ? 
          <UpdateNodeForm 
            updateNode={updateNode} 
            data={data} 
            deselect={deselectAll} /> : null }
        { currentForm == 'UpdateEdgeForm' ? 
          <UpdateEdgeForm 
            updateEdge={updateEdge} 
            getGraph={getGraph} 
            data={data}
            deselect={deselectAll} /> : null }
        { currentForm == 'UpdateCaptionForm' ? 
          <UpdateCaptionForm 
            updateCaption={updateCaption} 
            data={data}
            deselect={deselectAll} /> : null }
        { currentForm == 'UpdateNodeForm' && source && source.getConnectedNodes ? 
          <AddConnectedNodesForm
            data={data}
            source={source} 
            closeAddForm={closeAddForm} 
            graph={graph}
            addSurroundingNodes={addSurroundingNodes} 
            addEdge={addEdge} /> : null }
        { helpScreen ? <HelpScreen source={source} /> : null }
      </div>
    );
  }
}
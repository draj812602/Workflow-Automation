import React, { useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addNode,
  setEdges,
  deleteNode,
  updateNodes,
} from "../redux/workflowSlice";
import NodeSidebar from "./NodeSidebar";
import nodeTypes from "./CustomNodes";

const WorkflowCanvas = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state) => state.workflow);

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedType, setSelectedType] = useState("task");

  // Handle node changes (drag-and-drop)
  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(updateNodes(updatedNodes));
    },
    [dispatch, nodes]
  );

  // Handle edge changes (add/remove)
  const onEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(setEdges(updatedEdges));
    },
    [dispatch, edges]
  );

  // Handle new connections
  const onConnect = useCallback(
    (connection) => {
      const newEdges = addEdge(connection, edges);
      dispatch(setEdges(newEdges));
    },
    [dispatch, edges]
  );

  // Add a new node
  const handleAddNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: selectedType,
      data: {
        label: `${
          selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
        } ${nodes.length + 1}`,
        nodeType: selectedType,
      },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    dispatch(addNode(newNode));
  };

  // Select a node for editing or deletion
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Delete the selected node
  const handleDeleteNode = () => {
    if (selectedNode) {
      dispatch(deleteNode(selectedNode.id));
      setSelectedNode(null); // Close sidebar
    }
  };

  return (
    <div className="relative w-full h-[80vh]">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-10 p-2 flex space-x-2 bg-white shadow-md rounded-lg px-4 py-2">
        {/* Node Type Selection */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="task">Task</option>
          <option value="condition">Condition</option>
          <option value="notification">Notification</option>
        </select>
        <button
          onClick={handleAddNode}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Add {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
        </button>
      </div>

      {/* Workflow Canvas */}
      <div className="w-full h-full border border-gray-300 rounded-md bg-white shadow-md">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Node Sidebar */}
      {selectedNode && (
        <NodeSidebar
          selectedNode={selectedNode}
          closeSidebar={() => setSelectedNode(null)}
          deleteNode={handleDeleteNode}
        />
      )}
    </div>
  );
};

export default WorkflowCanvas;

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
  deleteEdge,
  deleteNode,
} from "../redux/workflowSlice";
import NodeSidebar from "./NodeSidebar";
import nodeTypes from "./CustomNodes"; // Import custom node types

const WorkflowCanvas = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state) => state.workflow);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedType, setSelectedType] = useState("task");

  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch({ type: "workflow/updateNodes", payload: updatedNodes });
    },
    [dispatch, nodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(setEdges(updatedEdges));
    },
    [dispatch, edges]
  );

  const onConnect = useCallback(
    (connection) => dispatch(setEdges(addEdge(connection, edges))),
    [dispatch, edges]
  );

  const onEdgeClick = (event, edge) => {
    dispatch(deleteEdge(edge.id));
  };

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

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleDeleteNode = (nodeId) => {
    dispatch(deleteNode(nodeId));
    setSelectedNode(null); // ✅ Close sidebar when node is deleted
  };

  return (
    <div className="relative w-full h-[80vh]">
      {/* Node Type Selection */}
      <div className="absolute top-4 left-4 z-10 p-2 flex space-x-2">
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
          onEdgeClick={onEdgeClick}
          onNodeClick={onNodeClick} // ✅ Sidebar opens on node click
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
          onDeleteNode={handleDeleteNode} // ✅ Ensure correct deletion handling
        />
      )}
    </div>
  );
};

export default WorkflowCanvas;

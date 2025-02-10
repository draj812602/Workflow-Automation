import React, { useState } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import useWorkflowState from "../hooks/useWorkflowState";
import NodeSidebar from "./NodeSidebar";
import nodeTypes from "./CustomNodes";

const WorkflowCanvas = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    handleAddNode,
    handleDeleteNode,
    onEdgesChange,
    onConnect,
    handleExport,
    handleImport,
  } = useWorkflowState();

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedType, setSelectedType] = useState("task");

  const onNodeClick = (event, node) => setSelectedNode(node);

  return (
    <div className="relative w-full h-[90vh]">
      <div className="absolute top-4 left-4 z-10 flex space-x-2 p-3 bg-white shadow-md rounded-lg">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="task">Task</option>
          <option value="condition">Condition</option>
          <option value="notification">Notification</option>
        </select>
        <button
          onClick={() => handleAddNode(selectedType)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add {selectedType}
        </button>
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export
        </button>
        <input
          type="file"
          accept=".json"
          onChange={(e) => handleImport(e.target.files[0])}
          className="hidden"
          id="import-file"
        />
        <label
          htmlFor="import-file"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
        >
          Import
        </label>
      </div>

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
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {selectedNode && (
        <NodeSidebar
          selectedNode={selectedNode}
          closeSidebar={() => setSelectedNode(null)}
          deleteNode={() => handleDeleteNode(selectedNode.id)}
        />
      )}
    </div>
  );
};

export default WorkflowCanvas;

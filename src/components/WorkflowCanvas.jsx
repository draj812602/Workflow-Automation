import React, { useState } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import useWorkflowState from "../hooks/useWorkflowState";
import { useDispatch } from "react-redux";
import { exportWorkflow, importWorkflow } from "../redux/workflowSlice";
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
    handleUndo,
    handleRedo,
    history,
    future,
  } = useWorkflowState();

  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedType, setSelectedType] = useState("task");

  const onNodeClick = (event, node) => setSelectedNode(node);

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedData = JSON.parse(e.target.result);
        dispatch(importWorkflow(importedData));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="relative w-full h-[80vh]">
      <div className="absolute top-4 left-4 z-10 flex space-x-2 p-2 bg-white shadow-md rounded-lg">
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
          onClick={handleUndo}
          disabled={history.length === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={future.length === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Redo
        </button>
        <button
          onClick={() => dispatch(exportWorkflow())}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export
        </button>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
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

      <div className="w-full h-full">
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

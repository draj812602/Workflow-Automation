import React, { useState, useCallback } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
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
    handleUndo,
    handleRedo,
    handleImportWorkflow,
    history,
    future,
  } = useWorkflowState();

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedType, setSelectedType] = useState("task");

  // ✅ Ensure onNodeClick properly sets the selected node
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  // ✅ Export Workflow as JSON
  const handleExport = () => {
    const workflowData = { nodes, edges };
    const jsonData = JSON.stringify(workflowData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "workflow.json";
    link.click();
  };

  // ✅ Import Workflow from JSON File
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workflowData = JSON.parse(e.target.result);
        if (workflowData.nodes && workflowData.edges) {
          handleImportWorkflow(workflowData);
        } else {
          alert("Invalid workflow file.");
        }
      } catch (error) {
        alert("Error parsing file. Please upload a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative w-full h-[80vh]">
      {/* ✅ Toolbar */}
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
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export
        </button>
        <label
          htmlFor="import-file"
          className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Import
        </label>
        <input
          id="import-file"
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImport}
        />
      </div>

      {/* ✅ Workflow Canvas */}
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick} // ✅ Ensure this is included
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* ✅ Node Sidebar - Opens on Node Click */}
      {selectedNode && (
        <NodeSidebar
          selectedNode={selectedNode}
          closeSidebar={() => setSelectedNode(null)}
          deleteNode={() => {
            handleDeleteNode(selectedNode.id);
            setSelectedNode(null);
          }}
        />
      )}
    </div>
  );
};

export default WorkflowCanvas;

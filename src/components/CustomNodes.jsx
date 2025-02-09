import React from "react";
import { Handle, Position } from "reactflow";

// ✅ Reusable Handles Component (Separate Source & Target Handles)
const Handles = ({ color }) => (
  <>
    {/* ✅ Source Handles (Output Connections) */}
    <Handle
      type="source"
      position={Position.Right}
      className={`w-3 h-3 bg-${color}-500 rounded-full`}
    />
    <Handle
      type="source"
      position={Position.Bottom}
      className={`w-3 h-3 bg-${color}-500 rounded-full`}
    />

    {/* ✅ Target Handles (Input Connections) */}
    <Handle
      type="target"
      position={Position.Left}
      className={`w-3 h-3 bg-${color}-500 rounded-full`}
    />
    <Handle
      type="target"
      position={Position.Top}
      className={`w-3 h-3 bg-${color}-500 rounded-full`}
    />
  </>
);

// ✅ Optimized TaskNode Component
const TaskNode = ({ data }) => (
  <div className="p-4 border border-blue-500 bg-blue-100 rounded shadow relative">
    <strong>Task:</strong> {data.label}
    <Handles color="blue" /> {/* ✅ Reuse Handles Component */}
  </div>
);

// ✅ Optimized ConditionNode Component
const ConditionNode = ({ data }) => (
  <div className="p-4 border border-yellow-500 bg-yellow-100 rounded shadow relative">
    <strong>Condition:</strong> {data.label}
    <Handles color="yellow" />
  </div>
);

// ✅ Optimized NotificationNode Component
const NotificationNode = ({ data }) => (
  <div className="p-4 border border-green-500 bg-green-100 rounded shadow relative">
    <strong>Notification:</strong> {data.label}
    <Handles color="green" />
  </div>
);

// ✅ Export custom node types
const nodeTypes = {
  task: TaskNode,
  condition: ConditionNode,
  notification: NotificationNode,
};

export default nodeTypes;

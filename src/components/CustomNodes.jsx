import React from "react";
import { Handle, Position } from "reactflow";

// Memoized Handles Component
const Handles = React.memo(({ color }) => (
  <>
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
));

// Memoized Task Node
const TaskNode = React.memo(({ data }) => (
  <div className="p-4 border border-blue-500 bg-blue-100 rounded shadow relative">
    <strong>Task:</strong> {data.label}
    <Handles color="blue" />
  </div>
));

// Memoized Condition Node
const ConditionNode = React.memo(({ data }) => (
  <div className="p-4 border border-yellow-500 bg-yellow-100 rounded shadow relative">
    <strong>Condition:</strong> {data.label}
    <Handles color="yellow" />
  </div>
));

// Memoized Notification Node
const NotificationNode = React.memo(({ data }) => (
  <div className="p-4 border border-green-500 bg-green-100 rounded shadow relative">
    <strong>Notification:</strong> {data.label}
    <Handles color="green" />
  </div>
));

// Export optimized node types
const nodeTypes = {
  task: TaskNode,
  condition: ConditionNode,
  notification: NotificationNode,
};

export default nodeTypes;

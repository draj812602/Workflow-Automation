import React from "react";
import TaskForm from "./forms/TaskForm";
import ConditionForm from "./forms/ConditionForm";
import NotificationForm from "./forms/NotificationForm";
import useNodeForm from "../hooks/useNodeForm";

const NodeSidebar = ({ selectedNode, closeSidebar, deleteNode }) => {
  const { register, handleSubmit, onSubmit, errors } = useNodeForm(
    selectedNode,
    closeSidebar
  );

  return (
    <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-4 border-l border-gray-300">
      <h3 className="text-lg font-semibold mb-4">
        Edit {selectedNode.data.nodeType}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {selectedNode.data.nodeType === "task" && (
          <TaskForm register={register} defaultValues={selectedNode.data} />
        )}
        {selectedNode.data.nodeType === "condition" && (
          <ConditionForm
            register={register}
            defaultValues={selectedNode.data}
          />
        )}
        {selectedNode.data.nodeType === "notification" && (
          <NotificationForm
            register={register}
            defaultValues={selectedNode.data}
          />
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={closeSidebar}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
        <button
          type="button"
          onClick={deleteNode}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition mt-4"
        >
          Delete Node
        </button>
      </form>
    </div>
  );
};

export default NodeSidebar;

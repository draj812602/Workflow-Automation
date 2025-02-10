import React, { useEffect } from "react";
import TaskForm from "./forms/TaskForm";
import ConditionForm from "./forms/ConditionForm";
import NotificationForm from "./forms/NotificationForm";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateNode } from "../redux/workflowSlice";

const NodeSidebar = ({ selectedNode, closeSidebar, deleteNode }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (selectedNode) {
      reset({
        label: selectedNode.data.label || `Node ${selectedNode.id}`,
        ...selectedNode.data,
      });
    }
  }, [selectedNode, reset]);

  const handleFormSubmit = (data) => {
    dispatch(
      updateNode({
        id: selectedNode.id,
        data: { ...selectedNode.data, ...data },
      })
    );
    closeSidebar();
  };

  return (
    <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-4 border-l border-gray-300">
      <h3 className="text-lg font-semibold mb-4">
        Edit {selectedNode.data.nodeType}
      </h3>

      <label className="block text-sm font-medium">Node Name</label>
      <input
        type="text"
        {...register("label", { required: "Node Name is required" })}
        className="w-full p-2 border border-gray-300 rounded"
      />

      {/* Load correct form dynamically */}
      {selectedNode.data.nodeType === "task" && (
        <TaskForm
          onSubmit={handleFormSubmit}
          defaultValues={selectedNode.data}
          register={register}
        />
      )}
      {selectedNode.data.nodeType === "condition" && (
        <ConditionForm
          onSubmit={handleFormSubmit}
          defaultValues={selectedNode.data}
          register={register}
        />
      )}
      {selectedNode.data.nodeType === "notification" && (
        <NotificationForm
          onSubmit={handleFormSubmit}
          defaultValues={selectedNode.data}
          register={register}
        />
      )}

      <div className="space-y-4 mt-4">
        <div className="flex justify-between">
          <button
            onClick={closeSidebar}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit(handleFormSubmit)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
        <button
          onClick={deleteNode}
          className="px-4 py-2 bg-red-500 text-white w-full rounded hover:bg-red-600"
        >
          Delete Node
        </button>
      </div>
    </div>
  );
};

export default NodeSidebar;

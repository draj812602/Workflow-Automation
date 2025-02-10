import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateNode } from "../redux/workflowSlice";
import TaskForm from "./forms/TaskForm";
import ConditionForm from "./forms/ConditionForm";
import NotificationForm from "./forms/NotificationForm";

const NodeSidebar = ({ selectedNode, closeSidebar, deleteNode }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (selectedNode) {
      reset(selectedNode.data);
    }
  }, [selectedNode, reset]);

  const onSubmit = (data) => {
    dispatch(updateNode({ id: selectedNode.id, data }));
    closeSidebar();
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 border-l border-gray-300">
      <h3 className="text-lg font-semibold mb-4">
        Edit {selectedNode.data.nodeType}
      </h3>

      <label className="block text-sm font-medium">Node Name</label>
      <input
        type="text"
        {...register("label", { required: "Node Name is required" })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.label && (
        <p className="text-red-500 text-sm">{errors.label.message}</p>
      )}

      {/* Pass validation errors to correct form */}
      {selectedNode.data.nodeType === "task" && (
        <TaskForm
          onSubmit={onSubmit}
          defaultValues={selectedNode.data}
          register={register}
          errors={errors}
        />
      )}
      {selectedNode.data.nodeType === "condition" && (
        <ConditionForm
          onSubmit={onSubmit}
          defaultValues={selectedNode.data}
          register={register}
          errors={errors}
        />
      )}
      {selectedNode.data.nodeType === "notification" && (
        <NotificationForm
          onSubmit={onSubmit}
          defaultValues={selectedNode.data}
          register={register}
          errors={errors}
        />
      )}

      {/* ✅ Corrected Button Alignment with Spacing */}
      <div className="flex justify-between mt-4 gap-2">
        <button
          onClick={closeSidebar}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-1/2"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-1/2"
        >
          Save
        </button>
      </div>

      {/* ✅ Delete Button Takes Full Width with More Margin */}
      <button
        onClick={deleteNode}
        className="w-full mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Delete Node
      </button>
    </div>
  );
};

export default NodeSidebar;

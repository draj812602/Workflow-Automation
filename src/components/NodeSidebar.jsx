import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateNode } from "../redux/workflowSlice";

const NodeSidebar = ({ selectedNode, closeSidebar, onDeleteNode }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedNode) {
      reset({ label: selectedNode.data.label });
    }
  }, [selectedNode, reset]);

  const onSubmit = (data) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-sm font-medium mb-1">Label</label>
        <input
          type="text"
          {...register("label", { required: "Label is required" })}
          className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
        />
        {errors.label && (
          <p className="text-red-500 text-sm">{errors.label.message}</p>
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
      </form>

      {/* Delete Button */}
      <button
        onClick={() => onDeleteNode(selectedNode.id)}
        className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Delete Node
      </button>
    </div>
  );
};

export default NodeSidebar;

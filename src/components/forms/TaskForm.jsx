import React from "react";
import { useForm } from "react-hook-form";

const TaskForm = ({ onSubmit, defaultValues, register, errors }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-medium">Task Name</label>
      <input
        type="text"
        {...register("taskName", { required: "Task Name is required" })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.taskName && (
        <p className="text-red-500 text-sm">{errors.taskName.message}</p>
      )}

      <label className="block text-sm font-medium">Assignee</label>
      <input
        type="text"
        {...register("assignee", { required: "Assignee is required" })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.assignee && (
        <p className="text-red-500 text-sm">{errors.assignee.message}</p>
      )}

      <label className="block text-sm font-medium">Due Date</label>
      <input
        type="date"
        {...register("dueDate", { required: "Due Date is required" })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.dueDate && (
        <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
      )}
    </form>
  );
};

export default TaskForm;

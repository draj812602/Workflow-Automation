import React from "react";

const TaskForm = ({ register, defaultValues = {} }) => (
  <>
    <label className="block text-sm font-medium">Task Name</label>
    <input
      type="text"
      {...register("taskName", { required: "Task Name is required" })}
      defaultValue={defaultValues.taskName || ""}
      className="w-full p-2 border border-gray-300 rounded"
    />

    <label className="block text-sm font-medium">Assignee</label>
    <input
      type="text"
      {...register("assignee", { required: "Assignee is required" })}
      defaultValue={defaultValues.assignee || ""}
      className="w-full p-2 border border-gray-300 rounded"
    />

    <label className="block text-sm font-medium">Due Date</label>
    <input
      type="date"
      {...register("dueDate", { required: "Due Date is required" })}
      defaultValue={defaultValues.dueDate || ""}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </>
);

export default TaskForm;

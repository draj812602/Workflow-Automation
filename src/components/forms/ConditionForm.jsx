import React from "react";

const ConditionForm = ({ register, defaultValues = {} }) => (
  <>
    <label className="block text-sm font-medium">Condition Type</label>
    <select
      {...register("conditionType", {
        required: "Condition Type is required",
      })}
      defaultValue={defaultValues.conditionType || ""}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="equals">Equals</option>
      <option value="greaterThan">Greater Than</option>
      <option value="lessThan">Less Than</option>
    </select>

    <label className="block text-sm font-medium">Value</label>
    <input
      type="text"
      {...register("value", { required: "Value is required" })}
      defaultValue={defaultValues.value || ""}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </>
);

export default ConditionForm;

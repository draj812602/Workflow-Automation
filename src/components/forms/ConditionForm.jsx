import React from "react";
import { useForm } from "react-hook-form";

const ConditionForm = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      conditionType: defaultValues?.conditionType || "equals",
      value: defaultValues?.value || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block text-sm font-medium">Condition Type</label>
      <select
        {...register("conditionType", {
          required: "Condition Type is required",
        })}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="equals">Equals</option>
        <option value="greaterThan">Greater Than</option>
        <option value="lessThan">Less Than</option>
      </select>
      {errors.conditionType && (
        <p className="text-red-500 text-sm">{errors.conditionType.message}</p>
      )}

      <label className="block text-sm font-medium">Value</label>
      <input
        type="text"
        {...register("value", { required: "Value is required" })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.value && (
        <p className="text-red-500 text-sm">{errors.value.message}</p>
      )}
    </form>
  );
};

export default ConditionForm;

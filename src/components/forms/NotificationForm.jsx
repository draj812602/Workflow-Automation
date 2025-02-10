import React from "react";
import { useForm } from "react-hook-form";

const NotificationForm = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: defaultValues?.message || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block text-sm font-medium">Message</label>
      <textarea
        {...register("message", { required: "Message is required" })}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.message && (
        <p className="text-red-500 text-sm">{errors.message.message}</p>
      )}
    </form>
  );
};

export default NotificationForm;

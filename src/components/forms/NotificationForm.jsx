import React from "react";

const NotificationForm = ({ register, defaultValues = {} }) => (
  <>
    <label className="block text-sm font-medium">Message</label>
    <textarea
      {...register("message", { required: "Message is required" })}
      defaultValue={defaultValues.message || ""}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </>
);

export default NotificationForm;

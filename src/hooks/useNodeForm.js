import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateNode } from "../redux/workflowSlice";

const useNodeForm = (selectedNode, closeSidebar) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load existing node data when sidebar opens
  useEffect(() => {
    if (selectedNode) {
      reset({
        ...selectedNode.data,
        taskName: selectedNode.data.label || `Node ${selectedNode.id}`, // Node Name = Task Name
      });
    }
  }, [selectedNode, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    dispatch(
      updateNode({
        id: selectedNode.id,
        data: { ...selectedNode.data, ...data, label: data.taskName }, // Update Node Name
      })
    );
    closeSidebar();
  };

  return { register, handleSubmit, onSubmit, errors };
};

export default useNodeForm;

import { useState } from "react";

const useSidebar = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const openSidebar = (node) => {
    setSelectedNode(node);
  };

  const closeSidebar = () => {
    setSelectedNode(null);
  };

  return { selectedNode, openSidebar, closeSidebar };
};

export default useSidebar;

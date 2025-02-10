import { useDispatch, useSelector } from "react-redux";
import {
  addNode,
  updateNodes,
  deleteNode,
  setEdges,
  exportWorkflow,
  importWorkflow,
} from "../redux/workflowSlice";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";
import { useCallback } from "react";

const useWorkflowState = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state) => state.workflow);

  const onNodesChange = useCallback(
    (changes) => dispatch(updateNodes(applyNodeChanges(changes, nodes))),
    [dispatch, nodes]
  );

  const handleAddNode = useCallback(
    (type) => {
      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        data: { label: `${type} ${nodes.length + 1}`, nodeType: type },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
      };
      dispatch(addNode(newNode));
    },
    [dispatch, nodes]
  );

  const handleDeleteNode = useCallback(
    (nodeId) => dispatch(deleteNode(nodeId)),
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (changes) => dispatch(setEdges(applyEdgeChanges(changes, edges))),
    [dispatch, edges]
  );

  const onConnect = useCallback(
    (connection) => dispatch(setEdges(addEdge(connection, edges))),
    [dispatch, edges]
  );

  //Export JSON
  const handleExport = () => dispatch(exportWorkflow());

  // Import JSON
  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      dispatch(importWorkflow(importedData));
    };
    reader.readAsText(file);
  };

  return {
    nodes,
    edges,
    onNodesChange,
    handleAddNode,
    handleDeleteNode,
    onEdgesChange,
    onConnect,
    handleExport,
    handleImport,
  };
};

export default useWorkflowState;

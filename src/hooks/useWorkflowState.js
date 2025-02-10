import { useDispatch, useSelector } from "react-redux";
import {
  addNode,
  updateNodes,
  deleteNode,
  setEdges,
  deleteEdge,
  undo,
  redo,
} from "../redux/workflowSlice";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";

const useWorkflowState = () => {
  const dispatch = useDispatch();
  const { nodes, edges, history, future } = useSelector(
    (state) => state.workflow
  );

  const onNodesChange = (changes) => {
    const updatedNodes = applyNodeChanges(changes, nodes);
    dispatch(updateNodes(updatedNodes));
  };

  const handleAddNode = (type) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      data: { label: `${type} ${nodes.length + 1}`, nodeType: type },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    dispatch(addNode(newNode));
  };

  const handleDeleteNode = (nodeId) => {
    dispatch(deleteNode(nodeId));
  };

  const onEdgesChange = (changes) => {
    const updatedEdges = applyEdgeChanges(changes, edges);
    dispatch(setEdges(updatedEdges));
  };

  const onConnect = (connection) => {
    const updatedEdges = addEdge(connection, edges);
    dispatch(setEdges(updatedEdges));
  };

  const handleUndo = () => dispatch(undo());
  const handleRedo = () => dispatch(redo());

  return {
    nodes,
    edges,
    onNodesChange,
    handleAddNode,
    handleDeleteNode,
    onEdgesChange,
    onConnect,
    handleUndo,
    handleRedo,
    history,
    future,
  };
};

export default useWorkflowState;

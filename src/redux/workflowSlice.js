import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [
    {
      id: "1",
      type: "task",
      data: { label: "Task 1", nodeType: "Task" },
      position: { x: 250, y: 5 },
    },
  ],
  edges: [],
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const index = state.nodes.findIndex(
        (node) => node.id === action.payload.id
      );
      if (index !== -1) {
        state.nodes[index] = {
          ...state.nodes[index],
          data: action.payload.data,
        };
      }
    },
    updateNodes: (state, action) => {
      state.nodes = action.payload;
    },
    deleteNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ); // Remove related edges
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    deleteEdge: (state, action) => {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const {
  addNode,
  updateNode,
  updateNodes,
  deleteNode,
  setEdges,
  deleteEdge,
} = workflowSlice.actions;
export default workflowSlice.reducer;

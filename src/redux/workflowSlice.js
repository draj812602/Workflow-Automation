import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
  history: [], // Stores previous states for Undo
  future: [], // Stores undone states for Redo
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = [...state.nodes, action.payload];
    },
    updateNode: (state, action) => {
      const index = state.nodes.findIndex(
        (node) => node.id === action.payload.id
      );
      if (index !== -1) {
        const updatedNodes = [...state.nodes];
        updatedNodes[index] = {
          ...state.nodes[index],
          data: action.payload.data,
        };
        state.nodes = updatedNodes;
      }
    },
    updateNodes: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = [...action.payload];
    },
    deleteNode: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
    },
    setEdges: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.edges = [...action.payload];
    },
    deleteEdge: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const lastState = state.history.pop();
        state.future.push({ nodes: [...state.nodes], edges: [...state.edges] });
        state.nodes = [...lastState.nodes];
        state.edges = [...lastState.edges];
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop();
        state.history.push({
          nodes: [...state.nodes],
          edges: [...state.edges],
        });
        state.nodes = [...nextState.nodes];
        state.edges = [...nextState.edges];
      }
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
  undo,
  redo,
} = workflowSlice.actions;

export default workflowSlice.reducer;

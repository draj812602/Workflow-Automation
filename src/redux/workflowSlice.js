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
      state.nodes.push(action.payload);
    },

    updateNode: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
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

    deleteNode: (state, action) => {
      const nodeId = action.payload;
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
    },

    updateNodes: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = action.payload;
    },

    setEdges: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.edges = action.payload;
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

    importWorkflow: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = [...action.payload.nodes];
      state.edges = [...action.payload.edges];
    },
  },
});

export const {
  addNode,
  updateNode,
  deleteNode,
  updateNodes,
  setEdges,
  undo,
  redo,
  importWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;

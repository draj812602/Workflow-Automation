import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
  history: [],
  future: [],
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
    updateNodes: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = action.payload;
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
      state.edges = action.payload;
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
        state.nodes = lastState.nodes;
        state.edges = lastState.edges;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop();
        state.history.push({
          nodes: [...state.nodes],
          edges: [...state.edges],
        });
        state.nodes = nextState.nodes;
        state.edges = nextState.edges;
      }
    },
    exportWorkflow: (state) => {
      const json = JSON.stringify(
        { nodes: state.nodes, edges: state.edges },
        null,
        2
      );
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "workflow.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    importWorkflow: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.future = [];
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
  },
});

export const {
  addNode,
  updateNode, // ✅ Ensure `updateNode` is exported
  updateNodes,
  deleteNode,
  setEdges,
  deleteEdge,
  undo,
  redo,
  exportWorkflow, // ✅ Keep Export/Import functionality
  importWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;

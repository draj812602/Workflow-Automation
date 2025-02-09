import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import { updateNode } from "../redux/workflowSlice";

const WorkflowTable = () => {
  const dispatch = useDispatch();
  const { nodes } = useSelector((state) => state.workflow);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        id: "id",
        header: "Node ID",
        accessorKey: "id",
      },
      {
        id: "label",
        header: "Node Name",
        accessorKey: "label",
        cell: ({ getValue, row }) => (
          <input
            type="text"
            defaultValue={getValue()}
            onBlur={(e) =>
              dispatch(
                updateNode({
                  id: row.original.id,
                  data: { label: e.target.value },
                })
              )
            }
            className="w-full p-1 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          />
        ),
      },
      {
        id: "type",
        header: "Node Type",
        accessorKey: "type",
      },
    ],
    [dispatch]
  );

  // Format node data for the table
  const data = useMemo(
    () =>
      nodes.map((node) => ({
        id: node.id,
        label: node.data.label || "Unnamed",
        type: node.type,
      })),
    [nodes]
  );

  // Set up the table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Workflow Nodes
      </h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border border-gray-300">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border border-gray-300 text-left"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border border-gray-300 hover:bg-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border border-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={`px-4 py-2 rounded ${
            table.getCanPreviousPage()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={`px-4 py-2 rounded ${
            table.getCanNextPage()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkflowTable;

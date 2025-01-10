import { Column, Table } from "@tanstack/react-table";

function Filter({
  column,
  onFilterChange,
}: {
  column: Column<any, any>;
  onFilterChange: (
    columnId: string,
    value: string | number | undefined
  ) => void;
}) {
  // const firstValue = table
  //   .getPreFilteredRowModel()
  //   .flatRows[0]?.getValue(column.id);

  // console.log("firstValue", firstValue);

  const columnFilterValue = column.getFilterValue();

  // Для текстових полів (наприклад, Name, Email)
  if (column.id === "name" || column.id === "email") {
    return (
      <input
        className="w-36 border shadow rounded"
        onChange={(e) => onFilterChange(column.id, e.target.value)}
        // onChange={(e) => column.setFilterValue(e.target.value)}
        // onClick={(e) => e.stopPropagation()}
        placeholder={`Search ${column.id}...`}
        type="text"
        value={columnFilterValue ?? ""}
      />
    );
  }

  // Для числових полів (наприклад, ID)
  if (column.id === "id") {
    return (
      <input
        className="w-24 border shadow rounded"
        onChange={(e) => onFilterChange(column.id, e.target.value)}
        // onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search ID`}
        type="number"
        value={columnFilterValue ?? ""}
      />
    );
  }

  // Для селекту (наприклад, Role)
  if (column.id === "role") {
    return (
      <select
        value={columnFilterValue || ""}
        onChange={(e) => onFilterChange(column.id, e.target.value || undefined)}
        // onChange={(e) => column.setFilterValue(e.target.value || undefined)}
      >
        <option value="">All</option>
        <option value="Admin">Admin</option>
        <option value="Project Manager">Project Manager</option>
        <option value="Team Member">Team Member</option>
      </select>
    );
  }

  return null;
}

export default Filter;

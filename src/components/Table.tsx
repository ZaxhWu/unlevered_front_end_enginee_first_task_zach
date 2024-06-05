"use client";
import React, { useState, useEffect } from "react";
import { themes } from "@/styles/themes";
import { useTheme } from "@/context/ThemeContext";
import { useTable } from "@/context/TableContext";
import { useData } from "@/context/DataContext";
import TextColor from "./TextColor";

interface TableProps {
  id: string;
}

const Table: React.FC<TableProps> = ({ id }) => {
  const { theme, mode } = useTheme();
  const { tableState, setTableState } = useTable(id);
  const { data, updateData } = useData();
  const tableData = data[Number(id)] || {};

  if (id == "2" || id == "1") {
    delete tableData.tableData;
  }

  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [displayData, setDisplayData] = useState<Record<number, any>>({});

  useEffect(() => {
    const formattedData = Object.keys(tableData).reduce(
      (acc, key, index) => ({
        ...acc,
        [index + 1]: tableData[key],
      }),
      {}
    );
    setDisplayData(formattedData);
  }, [tableData]);

  const keys = Object.keys(displayData);
  const rowCount = Math.ceil(keys.length / tableState.columns);

  const handleDragStart = (key: number) => {
    setDraggedItem(key);
  };

  const handleDrop = (key: number) => {
    if (draggedItem === null) return;
    const newData = { ...displayData };
    const temp = newData[key];
    newData[key] = newData[draggedItem];
    newData[draggedItem] = temp;
    setDisplayData(newData);
    updateData({ ...data, [Number(id)]: newData });
    setDraggedItem(null);
  };

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableState({ columns: parseInt(e.target.value, 10) });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableState({ fontSize: parseInt(e.target.value, 10) });
  };

  const table = [];
  for (let i = 0; i < rowCount; i++) {
    const row = [];
    for (let j = 0; j < tableState.columns; j++) {
      const index = i * tableState.columns + j + 1;
      const cellData = displayData[index];
      row.push(
        <td
          key={index}
          style={{
            border: `1px solid ${theme.borderColor}`,
            padding: "10px",
            cursor: mode === "set" ? "pointer" : "default",
            fontSize: `${tableState.fontSize}px`,
            color: theme === themes.light ? "black" : "white",
          }}
          draggable={mode === "set"}
          onDragStart={() => handleDragStart(index)}
          onDrop={() => handleDrop(index)}
          onDragOver={(e) => e.preventDefault()}
        >
          {cellData && (
            <div>
              {typeof cellData === "string"
                ? cellData
                : Object.entries(cellData).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-blue-500">{key.toUpperCase()}</p>
                      <TextColor keyName={key} value={Number(value)} />
                    </div>
                  ))}
            </div>
          )}
        </td>
      );
    }
    table.push(<tr key={i}>{row}</tr>);
  }

  return (
    <div className="flex items-center justify-center m-2">
      <table className={`border-collapse border ${theme.borderColor}`}>
        <tbody>{table}</tbody>
      </table>

      {mode === "set" && (
        <div className="absolute right-4 flex p-4">
          <div>
            <p style={{ color: theme === themes.light ? "black" : "white" }}>
              Font Size
            </p>
            <input
              type="number"
              value={tableState.fontSize}
              onChange={handleFontSizeChange}
              min="1"
              className="m-2 w-16 border"
            />
          </div>
          <div>
            <p style={{ color: theme === themes.light ? "black" : "white" }}>
              Column Size
            </p>
            <input
              type="number"
              value={tableState.columns}
              onChange={handleColumnChange}
              min="1"
              className="m-2 w-16 border"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

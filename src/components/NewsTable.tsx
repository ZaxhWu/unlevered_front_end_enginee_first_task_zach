"use client";
import React, { useEffect, useState } from "react";
import { useData } from "@/context/DataContext";
import { themes } from "@/styles/themes";
import { useTheme } from "@/context/ThemeContext";

interface Article {
  score: number;
  summary: string;
}

interface TransformedData {
  [key: number]: {
    [key: string]: number | string;
    summary: string;
  };
}

const defaultNews = {
  1: { "Initial article": 0, summary: "Initial news" },
};

const DraggableTable: React.FC = () => {
  const { data, updateData } = useData();
  const { theme, mode } = useTheme();
  const [tableData, setTableData] = useState(data[Number(3)] || defaultNews);
  const [columns, setColumns] = useState<string[]>([
    "Article",
    "Score",
    "Summary",
  ]);

  useEffect(() => {
    setTableData(data[Number(3)] || defaultNews);
  }, [data]);

  const onDragStartRow = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    e.dataTransfer.setData("rowIndex", index.toString());
  };

  const onDropRow = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("rowIndex"));
    if (draggedIndex !== index) {
      const updatedData = { ...tableData };
      const temp = updatedData[draggedIndex + 1];
      updatedData[draggedIndex + 1] = updatedData[index + 1];
      updatedData[index + 1] = temp;
      setTableData(updatedData);
      updateData({ ...data, [Number(3)]: updatedData });
    }
  };

  const allowDropRow = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  const onDragStartCol = (
    e: React.DragEvent<HTMLTableCellElement>,
    index: number
  ) => {
    e.dataTransfer.setData("colIndex", index.toString());
  };

  const onDropCol = (
    e: React.DragEvent<HTMLTableCellElement>,
    index: number
  ) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("colIndex"));
    if (draggedIndex !== index) {
      const updatedColumns = [...columns];
      const temp = updatedColumns[draggedIndex];
      updatedColumns[draggedIndex] = updatedColumns[index];
      updatedColumns[index] = temp;
      setColumns(updatedColumns);
    }
  };

  const allowDropCol = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  return (
    <table
      className="min-w-full border border-gray-200 m-2"
      style={{ color: theme === themes.light ? "black" : "white" }}
    >
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              style={{ cursor: mode === "set" ? "pointer" : "default" }}
              key={index}
              draggable={mode === "set"}
              onDragStart={(e) => onDragStartCol(e, index)}
              onDrop={(e) => onDropCol(e, index)}
              onDragOver={allowDropCol}
              className="py-2 px-4 border-b "
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(tableData).map((key, rowIndex) => {
          const article = tableData[parseInt(key)];
          const articleKey = Object.keys(article)[0];
          const score = article[articleKey] as number;
          const summary = article.summary;
          return (
            <tr
              style={{ cursor: mode === "set" ? "pointer" : "default" }}
              key={rowIndex}
              draggable={mode === "set"}
              onDragStart={(e) => onDragStartRow(e, rowIndex)}
              onDrop={(e) => onDropRow(e, rowIndex)}
              onDragOver={allowDropRow}
              className="border-t"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-r">
                  {col === "Article" && articleKey}
                  {col === "Score" && (
                    <p
                      className={score > 0 ? "text-green-500" : "text-red-500"}
                    >
                      {score}
                    </p>
                  )}
                  {col === "Summary" && summary}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DraggableTable;

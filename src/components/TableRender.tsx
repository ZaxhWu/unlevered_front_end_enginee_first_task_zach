"use client";
import React from "react";
import Table from "@/components/Table";
import { themes } from "@/styles/themes";
import { useTheme } from "@/context/ThemeContext";
import CandlestickChart from "./CandlestickChart";
import NewsTable from "./NewsTable";
import { useData } from "@/context/DataContext";

const TableRender: React.FC = () => {
  const { theme } = useTheme();
  const { data } = useData();

  return (
    <div
      className={`min-h-screen flex flex-col space-y-4 items-center justify-center ${theme.background} ${theme.color}`}
      style={{
        color: theme === themes.light ? "white" : "black",
        backgroundColor: theme === themes.light ? "white" : "black",
      }}
    >
      <div className="w-[90%] mt-20">
        <p
          className="top-4"
          style={{
            color: theme === themes.light ? "black" : "white",
          }}
        >
          {`Ticker : ${data[0]}`}
        </p>
        <div className="flex flex-col items-center justify-center">
          <CandlestickChart />
        </div>
        <div className="mt-8">
          <Table id="1" />
          <Table id="2" />
          <NewsTable />
        </div>
      </div>
    </div>
  );
};

export default TableRender;

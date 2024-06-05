"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/styles/themes";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// 动态导入 ReactApexChart 并禁用 SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const API_KEY = "demo";
const SYMBOL = "IBM";

const defaultData = [
  {
    x: new Date("2024-01-01"),
    y: [100, 110, 90, 105],
  },
  {
    x: new Date("2024-01-02"),
    y: [105, 115, 95, 110],
  },
  {
    x: new Date("2024-01-03"),
    y: [110, 120, 100, 115],
  },
];

const CandlestickChart: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>(defaultData);
  const { theme } = useTheme();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${API_KEY}`
      );
      const data = response.data["Time Series (Daily)"];

      const formattedData = Object.keys(data).map((date) => {
        const {
          "1. open": open,
          "2. high": high,
          "3. low": low,
          "4. close": close,
        } = data[date];
        return {
          x: new Date(date),
          y: [
            parseFloat(open),
            parseFloat(high),
            parseFloat(low),
            parseFloat(close),
          ],
        };
      });

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching data from Alpha Vantage:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("apexcharts").then((ApexCharts) => {
        (ApexCharts as any).exec("candlestick-chart", "updateOptions", {
          chart: {
            background: theme === themes.dark ? "black" : "white",
            foreColor: theme === themes.dark ? "white" : "black",
          },
        });
      });
    }
  }, [theme]);

  const chartOptions: ApexOptions = {
    chart: {
      id: "candlestick-chart",
      type: "candlestick",
      background: theme === themes.dark ? "black" : "white",
      foreColor: theme === themes.dark ? "white" : "black",
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div id="chart" className="w-full">
      <ReactApexChart
        options={chartOptions}
        series={[{ data: chartData }]}
        type="candlestick"
        height={500}
      />
    </div>
  );
};

export default CandlestickChart;

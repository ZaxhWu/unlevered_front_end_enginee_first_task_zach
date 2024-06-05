"use client";
import React from "react";
import { useData } from "@/context/DataContext";
import { themes } from "@/styles/themes";
import { useTheme } from "@/context/ThemeContext";

const FetchButton: React.FC = () => {
  const { updateData } = useData();
  const { theme } = useTheme();

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/financials");
      const result = await response.json();

      const { ticker, analyst_estimates, news, ...rest } = result;

      const processData = (data: any) => {
        return Object.keys(data).reduce(
          (acc: any, key: string, index: number) => {
            acc[index + 1] = { [key]: data[key] };
            return acc;
          },
          {}
        );
      };

      const transformNewsData = (data: any) => {
        const transformedData: { [key: number]: { [key: string]: number } } =
          {};
        let index = 1;

        for (const articleKey in data) {
          if (data.hasOwnProperty(articleKey)) {
            const article = data[articleKey];
            const score = article.sentiment.score;
            const value = article.sentiment.value;
            const transformedScore = value === "positive" ? score : score * -1;
            const summary = article.summary;

            transformedData[index] = {
              [articleKey]: transformedScore,
              summary: summary,
            };
            index++;
          }
        }

        return transformedData;
      };

      const newData = {
        0: ticker,
        1: processData(rest),
        2: processData(analyst_estimates),
        3: transformNewsData(news),
      };
      updateData(newData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <button
      onClick={fetchData}
      className={`m-2 p-2 absolute top-0 left-4 m-4`}
      style={{ color: theme === themes.light ? "black" : "white" }}
    >
      Fetch Dummy Data
    </button>
  );
};

export default FetchButton;

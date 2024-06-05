"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
interface DataContextType {
  data: { [key: number]: any };
  updateData: (newData: { [key: number]: any }) => void;
}
const DataContext = createContext<DataContextType | undefined>(undefined);
const initialData = {
  0: "Sample Ticker",
  1: {
    1: { sampleData1: 1 },
    2: { sampleData2: 2 },
    3: { sampleData3: 3 },
    4: { current_ratio: 7.1 },
    5: { debt_to_equity_ratio: 2.1 },
    6: { pb_ratio: 7.9 },
    tableData: {
      sampleData1: 1,
      sampleData2: 2,
      sampleData3: 3,
      current_ratio: 4,
      debt_to_equity_ratio: 5,
      pb_ratio: 6,
    },
  },
  2: {
    1: { estimate1: 4 },
    2: { estimate2: 5 },
    3: { estimate2: 6 },
    tableData: { estimate1: 1, estimate2: 2, estimate3: 3 },
  },
  3: {
    1: { news1: 0, summary: "Initial Summary1" },
    2: { news2: 0, summary: "Initial Summary2" },
    3: { news3: 0, summary: "Initial Summary3" },
  },
};
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<{ [key: number]: any }>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("data");
      return storedData ? JSON.parse(storedData) : initialData;
    }
    return initialData;
  });
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  const updateData = (newData: { [key: number]: any }) => {
    setData(newData);
  };
  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

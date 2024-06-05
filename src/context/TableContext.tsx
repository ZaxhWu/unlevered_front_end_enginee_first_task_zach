"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface TableState {
  columns: number;
  fontSize: number;
}

interface TableContextType {
  tableStates: { [id: string]: TableState };
  setTableState: (id: string, state: Partial<TableState>) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tableStates, setTableStates] = useState<{ [id: string]: TableState }>(
    () => {
      if (typeof window !== "undefined") {
        const storedTableStates = localStorage.getItem("tableStates");
        return storedTableStates ? JSON.parse(storedTableStates) : {};
      }
      return {};
    }
  );

  useEffect(() => {
    localStorage.setItem("tableStates", JSON.stringify(tableStates));
  }, [tableStates]);

  const setTableState = (id: string, state: Partial<TableState>) => {
    setTableStates((prevStates) => {
      const prevState = prevStates[id] || { columns: 3, fontSize: 16 };
      return {
        ...prevStates,
        [id]: { ...prevState, ...state },
      };
    });
  };

  return (
    <TableContext.Provider value={{ tableStates, setTableState }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = (id: string) => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTable must be used within a TableProvider");
  }
  const { tableStates, setTableState } = context;
  const tableState = tableStates[id] || { columns: 3, fontSize: 16 };
  return {
    tableState,
    setTableState: (state: Partial<TableState>) => setTableState(id, state),
  };
};

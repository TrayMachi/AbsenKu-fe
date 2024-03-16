import React, { useState, createContext, useContext } from 'react';

// Create a context
const DataContext = createContext<[any[], React.Dispatch<React.SetStateAction<any[]>>] | undefined>(undefined);

// Create a provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);

  return (
    <DataContext.Provider value={[data, setData]}>
      {children}
    </DataContext.Provider>
  );
};

// Create a hook to use the data context
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
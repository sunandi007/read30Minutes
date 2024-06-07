import React, { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextType {
  error: string | null;
  showError: (message: string) => void;
  hideError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
  };

  const hideError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
      {error && (
        <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white p-4 text-center">
          <span>{error}</span>
          <button onClick={hideError} className="ml-4 underline">
            Close
          </button>
        </div>
      )}
    </ErrorContext.Provider>
  );
};

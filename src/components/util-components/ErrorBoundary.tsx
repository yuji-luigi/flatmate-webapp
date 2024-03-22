import React, { useState, useEffect, ReactNode } from "react";

const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorListener = (error: any) => {
      setHasError(true);
    };

    window.addEventListener("error", errorListener);

    return () => {
      window.removeEventListener("error", errorListener);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export default ErrorBoundary;

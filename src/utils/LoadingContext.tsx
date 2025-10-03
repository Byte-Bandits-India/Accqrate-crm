import { useEffect, useState, useMemo, createContext, ReactNode, Dispatch, SetStateAction } from "react";

// CONTEXT TYPE
interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// DEFAULT CONTEXT VALUE
export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

// PROVIDER PROPS
interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const value = useMemo(
    () => ({ loading, setLoading }),
    [loading]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

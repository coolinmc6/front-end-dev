import { createContext, useContext } from 'react';

export function createSafeContext<T>(name: string) {
  const ctx = createContext<T | undefined>(undefined);

  const useSafeContext = () => {
    const context = useContext(ctx);
    if (!context) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return context;
  };

  return [ctx.Provider, useSafeContext] as const;
}

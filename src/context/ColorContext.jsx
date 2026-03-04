import React, { createContext, useContext } from 'react';

export const ColorContext = createContext({ primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899', isDark: true });

export function useColors() {
  return useContext(ColorContext);
}

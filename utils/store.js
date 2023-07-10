"use client";
import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  bookList: [],
  collapsed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "Book_List":
      return {
        ...state,
        bookList: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

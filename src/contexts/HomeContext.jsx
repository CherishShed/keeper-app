import React, { createContext, useState, useReducer } from "react";

export const LabelModal = createContext();
export const TextColor = createContext();

export function LabelModalContextProvider(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <LabelModal.Provider value={{ modalOpen, setModalOpen }}>
      {props.children}
    </LabelModal.Provider>
  );
}

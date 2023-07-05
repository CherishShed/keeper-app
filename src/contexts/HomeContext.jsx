import React, { createContext, useState, useReducer } from "react";

export const LabelModal = createContext();
export const SnackText = createContext();

export function LabelModalContextProvider(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <LabelModal.Provider value={{ modalOpen, setModalOpen }}>
      {props.children}
    </LabelModal.Provider>
  );
}

export function SnackTextContextProvider(props) {
  const snackReducer = (state, action) => {
    switch (action.type) {
      case "CLOSE_SNACK":
        return { ...state, open: false, snackText: "", alertType: "" }
      case "OPEN_SUCCESS_SNACK":
        return { ...state, open: true, snackText: "Succesful", alertType: "success" }
      case "OPEN_SUCCESS_SNACK":
        return { ...state, open: true, snackText: "An Error Occured", alertType: "error" }
      default:
        return state
    }
  }
  const [snackState, dispatchSnack] = useReducer(snackReducer, {
    open: false, snackText: "", alertType: ""
  })
  return (
    <SnackText.Provider value={{ snackState, dispatchSnack }}>
      {props.children}
    </SnackText.Provider>
  );
}

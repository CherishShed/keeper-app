import { createContext, useState, useContext, useReducer } from "react";
import axios from "axios";
import { SnackText } from "./HomeContext";

export const UserContext = createContext();

export function UserContextProvider(props) {
    // const [labels, setLabels] = useState([]);

    const { dispatchSnack } = useContext(SnackText);
    const userReducer = (state, action) => {
        switch (action.type) {
            case "SET_USER":
                axios
                    .get("http://localhost:8081/", {
                        headers: { Authorization: localStorage.getItem("token") },
                    })
                    .then((response) => {
                        console.log(response);
                        setUser({ ...user, ...response.data.user });
                        // setLabels([...response.data.user.labels]);
                    })
                    .catch((err) => {
                        if (err.response.data === "Unauthorized") {
                            window.location.pathname = "/login";
                        }
                    });
                break
            case "ADD_LABEL":
                axios.post("http://localhost:8081/newLabel", { key: action.labelKey }, {
                    headers: { Authorization: localStorage.getItem("token") },
                })
                    .then(() => {
                        dispatchSnack({ type: "OPEN_SUCCESS_SNACK" });
                        user.labels.push(action.labelKey)
                    })
                    .catch(() => {
                        dispatchSnack({ type: "OPEN_ERROR_SNACK" });
                    });
                break
            default:
                return state;
        }
    }

    const [user, dispatchUser] = useReducer(userReducer, {});

    return (
        <UserContext.Provider value={{ user, dispatchUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

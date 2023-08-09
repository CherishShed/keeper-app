import { createContext, useEffect, useState, useReducer } from "react";
import axios from "axios";
export const LabelContext = createContext();

export function LabelContextProvider(props) {
    const [labels, setLabels] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8081/", {
                headers: { Authorization: localStorage.getItem("token") },
            })
            .then((response) => {
                console.log("getting labels")
                console.log(response.data.user.labels);
                setLabels([...response.data.user.labels]);
            })
            .catch((err) => {
                if (err.response.data === "Unauthorized") {
                    window.location.pathname = "/login";
                }
            });
    }, []);

    return (
        <LabelContext.Provider value={{ labels, setLabels }}>
            {props.children}
        </LabelContext.Provider>
    );
}

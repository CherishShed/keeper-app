import { createContext, useState } from "react";
import axios from "axios";
export const LabelContext = createContext();

export function LabelContextProvider(props) {
    const [labels, setLabels] = useState([]);
    const [user, setUser] = useState({});
    axios
        .get("http://localhost:8081/", {
            headers: { Authorization: localStorage.getItem("token") },
        })
        .then((response) => {
            console.log(response);
            setUser({ ...response.data.user });
            setLabels([...response.data.user.labels]);
        })
        .catch((err) => {
            if (err.response.data === "Unauthorized") {
                window.location.pathname = "/login";
            }
        });


    return (
        <LabelContext.Provider value={{ labels, setLabels }}>
            {props.children}
        </LabelContext.Provider>
    );
}

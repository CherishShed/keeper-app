import { useState, useEffect } from "react";
import Footer from "./Footer";
import AddNote from "./AddNote";
// import data from "./data";
import axios from "axios";
import TemporaryDrawer from "./Nav";
import { LabelModalContextProvider, SnackTextContextProvider } from "../contexts/HomeContext";
import SnackFeed from "./SnackBarFeed";
import { UserContextProvider } from "../contexts/UserContext";

function Home() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  function getUserData() {
    axios
      .get("http://localhost:8081/", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        if (
          response.data.user.firstName === "" ||
          response.data.user.lastName === ""
        ) {
          window.location.pathname = "/userDetails";
        } else {
          setUser({ ...response.data.user });
          setNotes([...response.data.user.notes]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          window.location.pathname = "/login";
        }
      });
  }

  useEffect(() => {
    console.log("first");
    setTimeout(() => {
      getUserData();
    }, 1000);
    console.log(user);
  }, []);


  function addItem(noteText) {
    console.log("creatig");
    console.log(noteText);
    if (noteText) {
      console.log("posting");
      axios
        .post("http://localhost:8081/api", noteText, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((response) => {
          console.log(response);
          console.log("in here");
          if (response.data.status === "success") {
            console.log("second");
            getUserData();
            // dispatchSnack({ type: "OPEN_SUCCESS_SNACK" });
          }
        })
        .catch((err) => {
          if (err.response.data === "Unauthorized") {
            window.location.pathname = "/login";
          }
        });
    }
  }
  const getLabel = (e) => {
    axios
      .get(`http://localhost:8081/api/label/${e.target.textContent}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((result) => {
        console.log(result.data.data.value);
        setNotes(result.data.data.value);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div style={{ backgroundColor: "#EEE3CB", minHeight: "100vh" }}>
      {loading && (
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_n7QLgwDWpF.json"
          mode="bounce"
          background="transparent"
          speed="1"
          style={{
            width: "60%",
            height: "70%",
            margin: "0 auto",
            minHeight: "400px",
            minWidth: "300px",
          }}
          loop
          autoplay
        ></lottie-player>
      )}
      {!loading && (
        <div>
          <AddNote handleSubmit={addItem} />
          <UserContextProvider>
            <LabelModalContextProvider>
              <SnackTextContextProvider>
                <TemporaryDrawer
                  notes={notes}
                  user={user}
                  getLabel={getLabel}
                  getAllNotes={getUserData}
                />

                <SnackFeed />
              </SnackTextContextProvider>
            </LabelModalContextProvider>
          </UserContextProvider>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;

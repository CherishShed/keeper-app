import { useState, useEffect } from "react";
import Footer from "./Footer";
import AddNote from "./AddNote";
// import data from "./data";
import axios from "axios";
import TemporaryDrawer from "./Nav";
import { LabelModalContextProvider, SnackTextContextProvider } from "../contexts/HomeContext";
import SnackFeed from "./SnackBarFeed";
import { LabelContextProvider } from "../contexts/LabelContext";

function Home() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  function getUserData() {
    axios
      .get("https://keeper-backend-psi.vercel.app/", {
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


 
  const getLabel = (e) => {
    axios
      .get(`https://keeper-backend-psi.vercel.app/api/label/${e.target.textContent}`, {
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
          <LabelContextProvider>
            <LabelModalContextProvider>
              <AddNote getUserData={getUserData} />
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
          </LabelContextProvider>
          <Footer />
        </div >
      )
      }
    </div >
  );
}

export default Home;

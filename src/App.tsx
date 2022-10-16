import "./App.css";
import MainMap from "./components/MainMap";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCLEWBRlMFDFg_6r-RD-gRXvO-OkdFMMMc",
  authDomain: "gps-tracker-2bb3b.firebaseapp.com",
  projectId: "gps-tracker-2bb3b",
  storageBucket: "gps-tracker-2bb3b.appspot.com",
  messagingSenderId: "23514786480",
  appId: "1:23514786480:web:f93581ee1de5a40c2da975",
  measurementId: "G-CG07E7K9WT",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "test");
let lat = 0;
let lng = 0;

getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);

    lat = snapshot.docs[0].data().position._lat;
    lng = snapshot.docs[0].data().position._long;
    console.log(lat, lng);
  })
  .catch((e) => {
    console.log(e);
  });

// const lat = 57.881318;
// const lng = 11.581977;

function App() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        lat = snapshot.docs[0].data().position._lat;
        lng = snapshot.docs[0].data().position._long;
        setPosition({ lat, lng });
        console.log(lat, lng);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainMap
        containerSize={{ width: "80vw", height: "80vh" }}
        center={position}
        zoom={16}
      />
    </div>
  );
}

export default App;

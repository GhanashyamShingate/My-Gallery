import "./App.css";
//import "./Components/Navbar";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import { useState } from "react";
//import React from "react";
const photos = [
  "https://picsum.photos/id/1001/200/200",
  "https://picsum.photos/id/1002/200/200",
  "https://picsum.photos/id/1003/200/200",
  "https://picsum.photos/id/1004/200/200",
  "https://picsum.photos/id/1005/200/200",
  "https://picsum.photos/id/1006/200/200",
  "https://picsum.photos/id/1010/200/200",
  "https://picsum.photos/id/1008/200/200",
  "https://picsum.photos/id/1009/200/200",
];

function App() {
  const [items, setItems] = useState(photos);
  const [isCollapsed, collapse] = useState(false);

  const toggle = () => {
    collapse(!isCollapsed);
  };
  return (
    <>
      <Navbar />
      <div class="container text-center mt-5">
        <button
          className="btn btn-warning mx-3"
          onClick={() =>
            setItems(["https://picsum.photos/id/1009/200/200", ...items])
          }
        >
          +Add
        </button>
        <button className="btn btn-success " onClick={toggle}>
          collapse
        </button>
        <h1>Gallery</h1>
        <div className="row">
          {items.map((photo, index) => (
            <Card key={index} src={photo} />
          ))}
        </div>
      </div>
    </>
  );
}
export default App;

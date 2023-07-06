import "./App.css";
//import "./Components/Navbar";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import UploadForm from "./Components/Uploadform";
import { useEffect, useState, useReducer } from "react";
//import React from "react";
const photos = [
  // "https://picsum.photos/id/1001/200/200",
  // "https://picsum.photos/id/1002/200/200",
  // "https://picsum.photos/id/1003/200/200",
  // "https://picsum.photos/id/1004/200/200",
  // "https://picsum.photos/id/1005/200/200",
  // "https://picsum.photos/id/1006/200/200",
  // "https://picsum.photos/id/1010/200/200",
  // "https://picsum.photos/id/1008/200/200",
  // "https://picsum.photos/id/1009/200/200",
];

const initialState = {
  items: photos,
  count: photos.length,
  inputs: { title: null, file: null, path: null },
  isCollapsed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setItem":
      return {
        ...state,
        items: [action.payload.path, ...state.items],
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState();
  const [inputs, setInputs] = useState({ title: null, file: null, path: null });
  const [items, setItems] = useState(photos);
  const [isCollapsed, collapse] = useState(false);
  const handleOnChange = (e) => {
    if (e.target.name === "file") {
      setInputs({
        title: e.target.value,
        file: e.target.files[0],
        path: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setInputs({ ...inputs, title: e.target.value });
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    //setItems([inputs.path, ...items]);
    dispatch({ type: "setItem", payload: { path: inputs } });
    setInputs({ title: null, file: null, path: null });
    collapse(false);
  };

  useEffect(() => {
    console.log(state);
  }, [state.items]);

  useEffect(() => {
    setCount(
      `You have ${state.items.length} images${
        state.items.length > 1 ? `s` : ``
      }`
    );
  }, [state.items]);
  const toggle = () => {
    collapse(!isCollapsed);
  };
  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <button className="btn btn-success float-end" onClick={toggle}>
          {isCollapsed ? "Close" : "+ Add"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm
          inputs={inputs}
          isVisible={isCollapsed}
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        />
        <h1>Gallery</h1>
        {count}
        <div className="row">
          {state.items.map((photo, index) => (
            <Card key={index} src={photo.path} />
          ))}
        </div>
      </div>
    </>
  );
}
export default App;

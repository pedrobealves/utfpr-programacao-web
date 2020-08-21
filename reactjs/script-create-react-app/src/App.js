import React from "react";
import "./styles.css";
import HelloWorld from "./hello/HelloWorld";

export default function App() {
  return (
    <div className="App">
      <h1>Primeira aplicação utilizando create-react-app</h1>
      <HelloWorld mensagem="Hello 1" />
      <HelloWorld mensagem="Hello 2" />
      <HelloWorld mensagem="Hello 3" />
    </div>
  );
}

import React from "react";
import "./styles.css";
import TodoList from "./TodoList";

export default function App() {
  return (
    <div className="App">
      <h1>Aplicação feliz React.js</h1>
      <TodoList titulo={"Tarefas com propriedades"} />
    </div>
  );
}

import React, { useState } from "react";
import "./styles.css";
import TodoList from "./TodoList";

function App() {
  const [nome, set_nome] = useState(""),
    [contador, set_contador] = useState(0);

  return (
    <div className="App">
      <h1>Aplicação feliz React.js</h1>
      <input
        type="text"
        value={nome}
        onChange={(ev) => set_nome(ev.target.value)}
      />
      <div>Contador: {contador}</div>
      <TodoList titulo={nome} set_contador={set_contador} />
    </div>
  );
}

export default App;

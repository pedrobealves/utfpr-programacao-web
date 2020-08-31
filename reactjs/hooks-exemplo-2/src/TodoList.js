import React, { useState } from "react";
import "./TodoList.css";

export default function TodoList(props) {
  const [items, set_items] = useState([]),
    [novo, set_novo] = useState("");

  function adicionar() {
    props.set_contador(items.length + 1);
    set_items([{ texto: novo, checked: false }, ...items]);
    set_novo("");
  }

  function check(index) {
    set_items(
      items.map((item, id) => {
        if (id === index) return { texto: item.texto, checked: true };
        return item;
      })
    );
  }

  return (
    <div class="todo">
      <h2>{props.titulo}</h2>
      <input
        type="text"
        value={novo}
        onChange={(ev) => set_novo(ev.target.value)}
      />
      <button onClick={() => adicionar()}>Adicionar</button>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                onChange={() => check(index)}
                checked={item.checked}
              />
              <span className={item.checked && "checked"}>{item.texto}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

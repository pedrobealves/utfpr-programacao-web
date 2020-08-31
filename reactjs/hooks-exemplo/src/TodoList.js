import React from "react";
import "./TodoList.css";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], novo: "" };
  }

  adicionar() {
    const self = this;
    this.setState((state) => {
      const novo_state = {
        novo: "",
        items: [{ texto: state.novo, checked: false }, ...state.items]
      };
      self.props.set_contador(novo_state.items.length);
      return novo_state;
    });
  }

  handle_change(ev) {
    this.setState({
      novo: ev.target.value
    });
  }

  check(index) {
    this.setState((state) => {
      return {
        items: state.items.map((item, id) => {
          if (id === index) return { texto: item.texto, checked: true };
          return item;
        })
      };
    });
  }

  render() {
    return (
      <div class="todo">
        <h2>{this.props.titulo}</h2>
        <input
          type="text"
          value={this.state.novo}
          onChange={this.handle_change.bind(this)}
        />
        <button onClick={this.adicionar.bind(this)}>Adicionar</button>
        <ul>
          {this.state.items.map((item, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={this.check.bind(this, index)}
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
}

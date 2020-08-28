import React from "react";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: ["novo"], novo: "" };
  }

  adicionar() {
    this.setState((state) => {
      return { novo: "", items: [state.novo, ...state.items] };
    });
  }

  handle_change(ev) {
    this.setState({
      novo: ev.target.value
    });
  }

  render() {
    return (
      <div class="todo">
        <input
          type="text"
          value={this.state.novo}
          onChange={this.handle_change.bind(this)}
        />
        <button onClick={this.adicionar.bind(this)}>Adicionar</button>
        <h2>{this.props.titulo}</h2>
        <ul>
          {this.state.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

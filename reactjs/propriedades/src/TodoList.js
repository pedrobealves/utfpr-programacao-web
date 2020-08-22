import React from "react";

export default class TodoList extends React.Component {
  render() {
    return (
      <div class="todo">
        <h2>{this.props.titulo}</h2>
        <ul>
          {this.props.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

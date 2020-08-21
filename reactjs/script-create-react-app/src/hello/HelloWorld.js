import React from "react";

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div className="hellow">
        Hello world do componente <span>{this.props.mensagem}</span>
      </div>
    );
  }
}

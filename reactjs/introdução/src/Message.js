import React from "react";
import "./message.css";

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msg: false };
  }

  show(ev) {
    this.setState({ msg: true });
  }
  render() {
    return (
      <div className="message">
        <button onClick={this.show.bind(this)}>{this.props.button}</button>
        <div className={this.state.msg ? "appear" : ""}>
          {this.props.message}
        </div>
      </div>
    );
  }
}

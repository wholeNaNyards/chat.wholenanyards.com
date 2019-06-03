import React, { Component } from "react";
import AutoDisconnect from "./AutoDisconnect";
import config from "./config";

import "./ChatRoom.css";

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "", messages: [], senderMap: {} };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.connection = new WebSocket(config.apiGateway.URL);

    this.connection.onmessage = ({ data }) => {
      const { messages, senderMap } = this.state;
      const { message, senderConnectionId } = JSON.parse(data);

      if (Object.prototype.hasOwnProperty.call(senderMap, senderConnectionId)) {
        this.setState({
          messages: messages.concat([
            { senderMessage: message, senderConnectionId }
          ])
        });
      } else {
        // https://www.paulirish.com/2009/random-hex-color-code-snippets/
        const hexCode = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        this.setState({
          messages: messages.concat([
            { senderMessage: message, senderConnectionId }
          ]),
          senderMap: { ...senderMap, [senderConnectionId]: hexCode }
        });
      }
    };
  }

  componentWillUnmount() {
    this.connection.close();
  }

  sendMessage() {
    const { message } = this.state;
    this.connection.send(
      JSON.stringify({ action: "sendmessage", data: message })
    );

    this.setState({ message: "" });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  render() {
    const { message, messages, senderMap } = this.state;

    return (
      <div className="chatRoom">
        <hr />
        <div className="chatList">
          {messages.map(({ senderMessage, senderConnectionId }, index) => (
            <p key={index}>
              <span
                style={{
                  color: senderMap[senderConnectionId],
                  fontWeight: 700
                }}
              >
                Anonymous
              </span>
              : {senderMessage}
            </p>
          ))}
        </div>
        <hr />
        <div className="chatInput">
          <input
            type="text"
            value={message}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );
  }
}

export default AutoDisconnect(ChatRoom);

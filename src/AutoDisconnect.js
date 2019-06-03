import React, { Component } from "react";

export default function(WrappedComponent) {
  return class AutoDisconnect extends Component {
    constructor(props) {
      super(props);
      this.state = {
        warnTime: 1000 * 5,
        //warnTime: 1000 * 60 * 4,
        disconnectTime: 1000 * 10
        //disconnectTime: 1000 * 60 * 5
      };
    }

    componentDidMount() {
      this.events = [
        "load",
        "mousemove",
        "mousedown",
        "click",
        "scroll",
        "keypress"
      ];

      for (var event of this.events) {
        window.addEventListener(event, this.resetTimeout);
      }

      this.setTimeout();
    }

    clearTimeoutFunc = () => {
      if (this.warnTimeout) {
        clearTimeout(this.warnTimeout);
      }

      if (this.disconnectTimeout) {
        clearTimeout(this.disconnectTimeout);
      }
    };

    setTimeout = () => {
      this.warnTimeout = setTimeout(this.warn, this.state.warnTime);
      this.disconnectTimeout = setTimeout(
        this.logout,
        this.state.disconnectTime
      );
    };

    resetTimeout = () => {
      this.clearTimeoutFunc();
      this.setTimeout();
    };

    warn = () => {
      console.log("You will be logged out automatically in 1 minute.");
    };

    logout = () => {
      console.log("You will now be logged out.");
    };

    render() {
      return (
        <div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

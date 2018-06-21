import React, { Component } from "react";
import Locale from "../../../locale";

import { Button } from "antd";

class LocaleButton extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Locale.set(Locale.get() === "en-US" ? "ru-RU" : "en-US");
    window.location.reload();
  }

  render() {
    return (
      <Button onClick={this.handleClick}>
        {Locale.get() === "en-US"
          ? Locale.locales()["ru-RU"].title
          : Locale.locales()["en-US"].title}
      </Button>
    );
  }
}

export default LocaleButton;

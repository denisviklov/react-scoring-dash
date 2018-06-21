import React from "react";
import { Input, Icon } from "antd";
import { injectIntl } from "react-intl";

const mask = "(___)-___-__-__";

class PhoneInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  format(raw) {
    let replsCount = (mask.match(/_/g) || []).length;
    let formatted = mask;
    const rawLen = raw.length;
    for (let i = 0; i < replsCount; i++) {
      if (i >= rawLen) {
        formatted = formatted.substr(
          0,
          formatted.lastIndexOf(raw[rawLen - 1]) + 1
        );
        break;
      }
      formatted = formatted.replace("_", raw[i]);
    }
    return formatted;
  }

  clean(value) {
    const maskChars = mask.replace("_", "").split("");
    let raw = value;
    for (let i = 0; i < maskChars.length; i++) {
      raw = raw.replace(maskChars[i], "");
    }
    return raw;
  }

  onChange(e) {
    let { value } = e.target;
    const reg = /^\d+$/;
    let raw = this.clean(value);
    let formatted = this.format(raw);
    if (reg.test(raw) || raw === "") {
      this.props.onChange(formatted);
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    let props_copy = {};
    props_copy = Object.assign(props_copy, this.props);
    props_copy.onChange = this.onChange;
    return (
      <Input
        ref="input"
        {...props_copy}
        addonBefore="+7"
        suffix={<Icon type="phone" style={{ fontSize: 13 }} />}
        placeholder={formatMessage({
          id: "register.phone-placeholder",
          defaultMessage: "Phone number"
        })}
      />
    );
  }
}

export default injectIntl(PhoneInput);
export let undecorated = PhoneInput;

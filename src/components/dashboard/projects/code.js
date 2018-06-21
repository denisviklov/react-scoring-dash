import React from "react";
import PropTypes from "prop-types";
import { Input, Checkbox, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Portlet from "../../utils/portlet";

const TextArea = Input.TextArea;

export class CodeForm extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onSaveClientDataChange: PropTypes.func.isRequired
  };
  render() {
    const { data } = this.props;
    return (
      <Portlet>
        <FormattedMessage
          id="code.description"
          defaultMessage="The script should be placed after the </form> tag and immediately before the end of the </body> tag. If your forms have multiple steps / follow a funnel, then this script should be placed on every page in the funnel."
        />
        <TextArea
          style={{ margin: "5px 0" }}
          value={data ? data.code : ""}
          placeholder="Код сниппета"
          autosize={{ minRows: 2, maxRows: 6 }}
          readOnly={true}
        />
        <Tooltip
          title={
            <span>
              <FormattedMessage
                id="code.save-client-data-tip"
                defaultMessage="Enabling this option allows to determine the lead authenticity and some more filters. "
              />
              <Link to="/help/pixel">
                <FormattedMessage id="code.more" defaultMessage="More..." />
              </Link>
            </span>
          }
        >
          <Checkbox
            checked={data ? data.saveClientData : false}
            onChange={this.props.onSaveClientDataChange}
          >
            <FormattedMessage
              id="code.save-client-data"
              defaultMessage="Save client data"
            />
          </Checkbox>
        </Tooltip>
      </Portlet>
    );
  }
}

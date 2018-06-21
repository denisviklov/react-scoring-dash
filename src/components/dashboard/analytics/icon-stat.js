import React from 'react';
import { Icon, Row } from 'antd';

const IconStat = (props) => (
  <div className="icon-stat">
    <span className="icon-stat-label">{props.label}</span>
    <Row style={{lineHeight: '32px'}} type='flex'>
      <span className="icon-stat-value">{props.value}</span>
      {props.icon ? (<Icon type={props.icon} style={props.iconStyle} className='icon-stat-visual' />): ''}
    </Row>
  </div>
)

export default IconStat;
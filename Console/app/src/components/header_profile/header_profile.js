//--------------------------------------------------
//  Components
//--------------------------------------------------

import React from 'react';
import { Popover, Avatar } from 'antd';

//--------------------------------------------------
//  CSS
//--------------------------------------------------

import './header_profile.css'

//--------------------------------------------------
//  Constants
//--------------------------------------------------

//--------------------------------------------------
//  HeaderProfile Class
//--------------------------------------------------

export class HeaderProfile extends React.Component {

  //--------------------------------------------------
  //  Class Properties
  //--------------------------------------------------

  state = {
    visible: false,
    username: 'Zanchee',
    icon: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/984.png'
  }

  //--------------------------------------------------
  //  Handle Hidden Menu
  //--------------------------------------------------

  hide = () => {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  //--------------------------------------------------
  //  Renderer
  //--------------------------------------------------

  render() {
    return (
      <Popover
        placement="bottomRight"
        content={
          <div>
            <a className='popoverItem' onClick={this.hide}>Reset password</a>
            <a className='popoverItem' onClick={this.hide}>Sign out</a>
          </div>
        }
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className="headerProfile">
          <Avatar className='avatar' src={this.state.icon} size="large" icon="user"/>
          <p className='user'>{this.state.username}</p>
        </div>
      </Popover>
    );
  }
}

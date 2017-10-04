//--------------------------------------------------
//  Components
//--------------------------------------------------

import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { HeaderProfile } from './../header_profile/header_profile.js';
import { Dashboard } from './../dashboard/dashboard.js';
import { TeamManager } from './../team_manager/team_manager.js';
import { Schedule } from './../league_schedule/schedule.js';
import { Standings } from './../league_standings/standings.js';
import { Teams } from './../league_teams/teams.js';
import { FAQ } from './../help_faq/faq.js';
import { Rules } from './../help_rules/rules.js';
//--------------------------------------------------
//  CSS
//--------------------------------------------------

import './console.css';

//--------------------------------------------------
//  Constants
//--------------------------------------------------

// Alias Constants
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

// Static Content
const FooterContent = 'Risen eSports © 2017 Created by Connor Ricks'
const HeaderHeight = 64;
const FooterHeight = 68;

// Sidemenu Items
const Sidemenu = {
  dashboard: 'Dashboard',
  teammanager: 'Team Manager',
  leagues: 'Leagues',
  help: 'Help'
};

// League Items & Tools
const Leagues = {
  tiers: {
    brawler: 'Brawler',
    duelist: 'Duelist',
    master: 'Master'
  },
  tools: {
    teams: 'Teams',
    schedule: 'Schedule',
    standings: 'Standings'
  }
};

// Help Items
const Help = {
  faq: 'FAQ',
  rules: 'Rules'
};

//--------------------------------------------------
//  Console Class
//--------------------------------------------------

export class Console extends React.Component {

  //--------------------------------------------------
  //  Class Properties
  //--------------------------------------------------

  state = {
    collapsed: false,
    viewWidth: '0',
    viewHeight: '0',
    current: {
      key: Sidemenu.dashboard,
      content: <Dashboard />
    }
  };

  //--------------------------------------------------
  //  Constructor
  //--------------------------------------------------

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  //--------------------------------------------------
  //  Resizing Listener
  //--------------------------------------------------

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ viewWidth: window.innerWidth, viewHeight: window.innerHeight });
  }

  //--------------------------------------------------
  //  Sidemenu Toggle
  //--------------------------------------------------

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  //--------------------------------------------------
  //  Content Handlers
  //--------------------------------------------------

  // Based on the key, returns the help content to display to the user.
  getHelpContent(key) {
    var newContent = null;
    switch (key) {
      case Help.faq:
        newContent = <FAQ />;
        break;
      case Help.rules:
        newContent = <Rules />;
        break;
      default:
        break;
    }
    return newContent;
  }

  // Based on the key, returns the league content to display to the user.
  getLeagueContent(key) {
    var newContent = null;
    const info = key.split('_');
    if ((info[0] !== null) && (info[1] !== null)) {
      const tier = info[0];
      const tool = info[1];
      switch (tool) {
        case Leagues.tools.standings:
          newContent = <Standings tier={tier}/>;
          break;
        case Leagues.tools.schedule:
          newContent = <Schedule tier={tier}/>;
          break;
        case Leagues.tools.teams:
          newContent = <Teams tier={tier}/>;
          break;
        default:
          break;
      }
    }
    return newContent;
  }

  // Based on the root & key, returns the content to display to the user.
  getContent(root, key) {
    var newContent = null;
    switch (root) {
      case Sidemenu.dashboard:
        newContent = <Dashboard />
        break;
      case Sidemenu.teammanager:
        newContent = <TeamManager />
        break;
      case Sidemenu.leagues:
        newContent = this.getLeagueContent(key);
        break;
      case Sidemenu.help:
        newContent = this.getHelpContent(key);
        break;
      default:
        break;
    }
    return newContent;
  }

  // Displays content based on user's menu click.
  handleMenuClick(e) {

    const root = e.keyPath[e.keyPath.length - 1];
    var newContent = null;

    // If event has a key, and isn't current key, update content.
    if ((e.key !== null) && (e.key !== this.state.current.key)) {
      newContent = this.getContent(root, e.key);
      // If we have new content, update the console.
      if (newContent !== null) {
        this.setState({
          current: {
            key: e.key,
            content: newContent
          }
        })
      }
    }
  }

  // Returns the correct styling for logo in sidemenu.
  getLogoStyle() {
    var style;
    if (this.state.collapsed) {
      style = {
        width: 56,
        margin: '4px 4px 2px 4px'
      }
    }
    else {
      style = {
        width: 150,
        margin: '25px 25px'
      }
    }
    return style;
  }

  //--------------------------------------------------
  //  Renderer
  //--------------------------------------------------

  render() {
    // Minimum content height for the screen.
    const minContentHeight = this.state.viewHeight - (HeaderHeight + FooterHeight);
    return (
      <Layout className='layout'>
        {/* Sidemenu */}
        <Sider className='sidemenu' collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <img src={require("./../../img/logo.png")} alt="" style={this.getLogoStyle()}/>
          {/* Navigation */}
          <Menu theme="dark" defaultSelectedKeys={[this.state.current.key]} mode="inline" onClick={this.handleMenuClick.bind(this)}>
            {/* Dashboard */}
            <Menu.Item key={Sidemenu.dashboard}>
              <span><Icon type="home" /><span>{Sidemenu.dashboard}</span></span>
            </Menu.Item>
            {/* Team Manager */}
            <Menu.Item key={Sidemenu.teammanager}>
              <span><Icon type="solution" /><span>{Sidemenu.teammanager}</span></span>
            </Menu.Item>
            {/* Leagues */}
            <SubMenu key={Sidemenu.leagues} title={<span><Icon type="fork"/><span>{Sidemenu.leagues}</span></span>}>
              {/* Brawler League */}
              <SubMenu key={Leagues.tiers.brawler} title={Leagues.tiers.brawler}>
                <Menu.Item key={Leagues.tiers.brawler + '_' + Leagues.tools.teams}>{Leagues.tools.teams}</Menu.Item>
                <Menu.Item key={Leagues.tiers.brawler + '_' + Leagues.tools.schedule}>{Leagues.tools.schedule}</Menu.Item>
                <Menu.Item key={Leagues.tiers.brawler + '_' + Leagues.tools.standings}>{Leagues.tools.standings}</Menu.Item>
              </SubMenu>
              {/* Duelist League */}
              <SubMenu key={Leagues.tiers.duelist} title={Leagues.tiers.duelist}>
                <Menu.Item key={Leagues.tiers.duelist + '_' + Leagues.tools.teams}>{Leagues.tools.teams}</Menu.Item>
                <Menu.Item key={Leagues.tiers.duelist + '_' + Leagues.tools.schedule}>{Leagues.tools.schedule}</Menu.Item>
                <Menu.Item key={Leagues.tiers.duelist + '_' + Leagues.tools.standings}>{Leagues.tools.standings}</Menu.Item>
              </SubMenu>
              {/* Master League */}
              <SubMenu key={Leagues.tiers.master} title={Leagues.tiers.master}>
                <Menu.Item key={Leagues.tiers.master + '_' + Leagues.tools.teams}>{Leagues.tools.teams}</Menu.Item>
                <Menu.Item key={Leagues.tiers.master + '_' + Leagues.tools.schedule}>{Leagues.tools.schedule}</Menu.Item>
                <Menu.Item key={Leagues.tiers.master + '_' + Leagues.tools.standings}>{Leagues.tools.standings}</Menu.Item>
              </SubMenu>
            </SubMenu>
            {/* Help */}
            <SubMenu key={Sidemenu.help} title={<span><Icon type="question-circle-o"/><span>{Sidemenu.help}</span></span>}>
              <Menu.Item key={Help.faq}>FAQ</Menu.Item>
              <Menu.Item key={Help.rules}>Rules</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className='layout'>
          {/* Header */}
          <Header className='header' style={{height: HeaderHeight}}>
            {/* Logo */}
            <h1 className='logo'><b>Tournament Console</b></h1>
            {/* HeaderProfile */}
            <HeaderProfile />
          </Header>
          {/* Content */}
          <Content className='content'>
            {/* Current Tab */}
            <div className='contentContainer' style={{minHeight: minContentHeight}}>
              {this.state.current.content}
            </div>
            {/* Footer */}
            <Footer className='footer' style={{height: FooterHeight}}>
              {FooterContent}
            </Footer>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//--------------------------------------------------
//  Components
//--------------------------------------------------

import React from 'react';
import { Table, Tabs } from 'antd';
import { ContentHeader } from './../content_header/content_header.js';

//--------------------------------------------------
//  CSS
//--------------------------------------------------

import './teams.css';

//--------------------------------------------------
//  Constants
//--------------------------------------------------

const TabPane = Tabs.TabPane;

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Wins', dataIndex: 'wins', key: 'wins'},
  { title: 'Losses', dataIndex: 'losses', key: 'losses'},
  { title: 'Position', dataIndex: 'position', key: 'position'}
];

const dataA = [
  { key: 1, name: 'DUCKS FLY TOGETHER', wins: '7', losses: '3', position: '1st'},
  { key: 2, name: 'SNEAKY TICKLERS', wins: '6', losses: '4', position: '2nd'},
  { key: 3, name: 'BLAME AND DIE', wins: '4', losses: '6', position: '3rd'},
  { key: 4, name: 'OUTPLAY OR FEED', wins: '3', losses: '7', position: '4th'}
];

const dataB = [
  { key: 1, name: 'RISE OF OLYMPUS', wins: '7', losses: '3', position: '1st'},
  { key: 2, name: 'DEEP SEA MONKEYS', wins: '6', losses: '4', position: '2nd'},
  { key: 3, name: 'EKKO FOX', wins: '4', losses: '6', position: '3rd'},
  { key: 4, name: 'LMAO AYY GAMING', wins: '3', losses: '7', position: '4th'}
];

//--------------------------------------------------
//  Console Class
//--------------------------------------------------

export class Teams extends React.Component {

  //--------------------------------------------------
  //  Class Properties
  //--------------------------------------------------

  state = {};

  //--------------------------------------------------
  //  Renderer
  //--------------------------------------------------

  render() {
    return (
      <div>
        <ContentHeader title={this.props.tier + " Teams"}/>
        <Tabs tabPosition='left'>
          <TabPane tab="Group A" key="1">
            <Table
              columns={columns}
              pagination={false}
              dataSource={dataA}
            />
          </TabPane>
          <TabPane tab="Group B" key="2">
            <Table
              columns={columns}
              pagination={false}
              dataSource={dataB}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

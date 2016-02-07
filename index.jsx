"use strict";

import _ from 'lodash';
import React from 'react';
import { ClipLoader } from 'halogen';
import './index.css';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected: 0,
      orderBy: 'created',
      orderType: 'asc',
      loading: true
    };
  }
  async componentDidMount() {
    this.setState({
      data: await this.props.dataSource(),
      loading: false
    });
  }
  render() {
    let list = _.sortBy(this.state.data, this.state.orderBy);
    if (this.state.orderType === 'desc') {
      list = _.reverse(list);
    }
    return (
      <div className="orders">
        {this.renderListTable(list)}
        {this.renderListView(list[this.state.selected])}
      </div>
    )
  }
  renderListTable(listData) {
    let contents;
    if (this.state.loading) {
      contents = (<div className="loader">
        <ClipLoader color="#242f40" size="14px" />
        <p>{this.props.loadingHint}</p>
      </div>);
    } else {
      contents = listData.map((item, index) => {
        let triangle = null;
        let classNames = 'list-table-row';
        if (this.state.selected === index) {
          triangle = <div className="list-table-triangle"></div>;
          classNames += ' list-table-row-selected';
        }
        return (
          <div className={classNames} key={index} onClick={() => {
            this.setState({selected: index});
          }}>
            {this.props.rows.map((row, index) => {
              return (
                <div className="list-table-column" key={index}>
                  {row.display ? row.display(item) : item.name}
                </div>
              );
            })}
            {triangle}
          </div>
        );
      });
    }
    return (
      <div className="list-table">
        <div className="list-table-header">
          {this.props.rows.map((row, index) => {
            return (
              <div className="list-table-column" key={index} 
                onClick={this._createSortFunc.call(this, row.sortBy || row.display)}>
                {row.title}
              </div>
            );
          })}
        </div>
        <div className="list-table-rows">{contents}</div>
      </div>
    );
  }
  renderListView(data) {
    if (!data) {
      return <div></div>;
    } else {
      return this.props.renderView(data);
    }  
  }
  _createSortFunc(key) {
    return () => {
      this.setState({
        orderBy: key,
        orderType: this.state.orderType === 'asc' ? 'desc' : 'asc'
      });
    };
  }
}

module.exports = ListView;

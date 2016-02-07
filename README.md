# React-Listify

List View Component based on React that supports loading progress bar.

### Installation

```sh
$ npm install react-listify --save
```

### Usage

```jsx
class List extends React.Component {
  constructor(props) {
    super(props);
    this.rows = [
      {
        title: '创建时间',
        sortBy: o => o.created,
        display: o => moment(o.created)
      },
      {
        title: '用户',
        sortBy: o => o.user.username,
        display: o => o.user.username
      },
      {
        title: '评论',
        sortBy: o => o.comments.length,
        display: o => o.comments.length
      }
    ];
  }
  renderView(data) {
    return (
      <div className="list-view">
        <div>TODO</div>
      </div>
    );
  }
  render() {
    return (
      <ListView
        loadingHint="正在加载订单信息"
        dataSource={async () => {
          return await request();
        }}
        renderView={this.renderView.bind(this)}
        rows={this.rows} 
      />
    );
  }
}

```

### License

MIT @ WeFlex, Inc.


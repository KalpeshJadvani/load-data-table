import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shipments: [],
      error: false,
      page: 1,
      limit: 5,
      total: 0
    };
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onchange = this.onchange.bind(this);
  }
  loadData() {
    const { page, limit } = this.state;
    let mTotal = 0;
    this.setState({ isLoading: true });
    fetch(`/api/shipments?_page=${page}&_limit=${limit}`)
      .then(result => {
        for (let entry of result.headers.entries()) {
          if (entry[0] === 'x-total-count') {
            mTotal = parseInt(entry[1]);
          }
        }
        return result.json();
      })
      .then(result => {
        this.setState({
          isLoading: false,
          shipments: result,
          total: mTotal
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          error: true
        });
      });
  }

  onShowSizeChange = (e, size) => {
    this.setState({ limit: size }, () => {
      this.loadData();
    });
    console.log('size', size);
  };
  onchange = e => {
    console.log('ee', e);
    this.setState({ page: e }, () => {
      this.loadData();
    });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { isLoading, shipments, error, total, page, limit } = this.state;

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

    if (error) {
      return <div className="App">Server error...</div>;
    }

    return (
      <Table
        onShowSizeChange={this.onShowSizeChange}
        limit={limit}
        shipments={shipments}
        total={total}
        page={page}
        onchange={this.onchange}
      ></Table>
    );
  }
}

export default App;

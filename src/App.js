import React, { Component, Fragment } from 'react';
import './App.css';
import Table from './components/Table';

const DESC = 'desc';
const ASC = 'asc';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shipments: [],
      error: false,
      page: 1,
      limit: 5,
      total: 0,
      order: ASC
    };
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onchange = this.onchange.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
  }
  loadData() {
    const { page, limit, order } = this.state;
    let mTotal = 0;
    this.setState({ isLoading: true });

    fetch(
      `/api/shipments?_page=${page}&_limit=${limit}&_sort=name&_order=${order}`
    )
      .then(result => {
        for (let entry of result.headers.entries()) {
          if (entry[0] === 'x-total-count') {
            mTotal = parseInt(entry[1]);
          }
        }
        return result.json();
      })
      .then(result => {
        console.log(result);
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
    const { total, page } = this.state;
    const maxNoOfPage = Math.ceil(total / size);
    const nPage = Math.min(maxNoOfPage, page);
    this.setState({ limit: size, page: nPage }, () => {
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

  onOrderChange = () => {
    const { order } = this.state;
    this.setState({ order: order === ASC ? DESC : ASC }, () => {
      this.loadData();
    });
  };

  render() {
    const {
      isLoading,
      shipments,
      error,
      total,
      page,
      limit,
      order
    } = this.state;

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

    if (error) {
      return <div className="App">Server error...</div>;
    }

    return (
      <Fragment>
        <button onClick={this.onOrderChange}>
          Sort by name: {order === ASC ? DESC : ASC}
        </button>
        <Table
          onShowSizeChange={this.onShowSizeChange}
          limit={limit}
          shipments={shipments}
          total={total}
          page={page}
          onchange={this.onchange}
        />
      </Fragment>
    );
  }
}

export default App;

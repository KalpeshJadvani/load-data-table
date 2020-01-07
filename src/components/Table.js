import React from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
const Table = props => {
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>mode</th>
            <th>type</th>
            <th>destination</th>
            <th>origin</th>
            <th>total</th>
            <th>status</th>
            <th>userId</th>
          </tr>
        </thead>
        <tbody>
          {props.shipments.map(e => {
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.mode}</td>
                <td>{e.type}</td>
                <td>{e.destination}</td>
                <td>{e.origin}</td>
                <td>{e.total}</td>
                <td>{e.status}</td>
                <td>{e.userId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        showSizeChanger
        pageSizeOptions={['2', '3', '5', '7']}
        onShowSizeChange={(e, size) => {
          props.onShowSizeChange(e, size);
        }}
        pageSize={props.limit}
        current={props.page}
        defaultCurrent={1}
        total={props.total}
        onChange={e => props.onchange(e)}
      />
    </div>
  );
};

export default Table;

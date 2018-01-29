import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';


var data = [
  {
      oilAmount: 465950,
      coalAmount: 63600,
      senatorName: "Ames Inhofe",
      state: "Oklahoma"
  },
  {
      oilAmount: 458466,
      coalAmount: 127356,
      senatorName: "John Barrasso",
      state: "Wyoming"
  },
  {
      oilAmount: 1180384,
      coalAmount: 361700,
      senatorName: "Mitch McConnel",
      state: "Kentucky"
  },
  {
      oilAmount: 1101456,
      coalAmount: 33050,
      senatorName: "John Cornyn",
      state: "Texas"
  },
  {
      oilAmount: 353864,
      coalAmount: 96000,
      senatorName: "Roy Blunt",
      state: "Missouri"
  }
];

export default class DataTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
          {
            Object.keys(this.props.data[0]).map(item => {
              return <th key={item}>{item}</th>
            })
          }
          </tr>  
        </thead>
        <tbody>
        {
          this.props.data.map(item => {
            return (
              <tr>
                <td key={item.oilAmount}>{item.oilAmount}</td>
                <td key={item.coalAmount}>{item.coalAmount}</td>
                <td key={item.senatorName}>{item.senatorName}</td>
                <td key={item.state}>{item.state}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
  }
}

ReactDOM.render(
    <DataTable data={data}/>,
    document.getElementById('root')
  );
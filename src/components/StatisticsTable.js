import React, { Component } from 'react';

export default class StatisticsTable extends Component {
  constructor(props) {
    super(props);

    this.sortStatistics = this.sortStatistics.bind(this);
  }

  // from w3 schools
  sortStatistics(n) {
    if (document.readyState !== "complete") {
      return;
    }

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("statistics").getElementsByTagName("table")[0];
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        if (dir === "asc") {
          if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  render() {
    return (
      <div className="statistics" id="statistics">
        <h1 className="no-statistics" style={{ textAlign: "center", display: "none" }}>No Statistics</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th onClick={() => this.sortStatistics(0)}>Rank <i className="fas fa-sort"></i></th>
              <th onClick={() => this.sortStatistics(1)}>Team <i className="fas fa-sort"></i></th>
              <th onClick={() => this.sortStatistics(2)}>Ranking Score <i className="fas fa-sort"></i></th>
              <th onClick={() => this.sortStatistics(3)}>Cargo <i className="fas fa-sort"></i></th>
              <th onClick={() => this.sortStatistics(4)}>Hatch Panel <i className="fas fa-sort"></i></th>
              <th onClick={() => this.sortStatistics(5)}>HAB Climb <i className="fas fa-sort"></i></th>
              <th onClick={() => this.sortStatistics(6)}>Sandstorm Bonus <i className="fas fa-sort"></i></th>
              <th>Record (W-L-T)</th>
              <th onClick={() => this.sortStatistics(8)}>DQ <i className="fas fa-sort"></i></th>
              <th onClick={() => this.sortStatistics(9)}>Played <i className="fas fa-sort"></i></th>
              <th onClick={() => this.sortStatistics(10)}>Total RP <i className="fas fa-sort"></i></th>
              <th>View Team Info</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}
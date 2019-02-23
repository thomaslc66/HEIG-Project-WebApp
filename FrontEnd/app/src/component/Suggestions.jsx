import React, { Component } from 'react';

class Suggestions extends Component {
  state = {};
  render() {
    const options = this.props.results.map((r, i) => (
      <div key={r.id}>
        <h3>{r.name}</h3>
        {r.logo}
        <h5>Passowrd</h5>
        {r.passwords.map((rr, i) => {
          return (
            <div>
              {rr.login} / {rr.password}
            </div>
          );
        })}
      </div>
    ));
    return <div>{options}</div>;
  }
}

export default Suggestions;

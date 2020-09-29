import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <React.Fragment>
        <div className="loading">
          <h2><FontAwesomeIcon icon={faCog} size="lg" spin /> loading...</h2>
        </div>
      </React.Fragment>
    )
  }
}
